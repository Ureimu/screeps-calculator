import { bodyTools } from "utils/tools";

export function initCreep(...[creep]: [CreepInput]): CreepOutput | EmptyOutput {
    if (creep.use === false) {
        return {
            use: false
        };
    }
    const creepBody: Partial<CreepOutput["body"]> = {};
    const creepBoost: Partial<CreepOutput["boost"]> = {};
    BODYPARTS_ALL.forEach(bodyName => {
        creepBody[bodyName] = bodyTools.getNum(creep.body, [bodyName]);
        creepBoost[bodyName] = creep.boost[bodyName] ? creep.boost[bodyName] : {};
    });
    creepBody.total = bodyTools.getNum(creep.body);
    if (!partialCreepBody(creepBody)) throw Error("partialCreepBody");
    if (!partialCreepBoost(creepBoost)) throw Error("partialCreepBoost");
    const countTiredPart = creepBody.total - creepBody.move - creepBody.carry;
    const countTiredPartLoaded = creepBody.total - creepBody.move;
    const fatiguePower = 1;
    const tiredPartValue = {
        noLoad: countTiredPart
            ? (countTiredPart / (creepBody.move * 2)) * fatiguePower
            : (1 / (creepBody.move * 2)) * fatiguePower,
        fullLoad: countTiredPartLoaded
            ? (countTiredPartLoaded / (creepBody.move * 2)) * fatiguePower
            : (1 / (creepBody.move * 2)) * fatiguePower
    };
    const boostCoefficientModification: { [abilityName in keyof CreepOutput["ability"]]: number } = {
        attack: 0,
        build: 0,
        dismantle: 0,
        harvest: 0,
        heal: 0,
        rangedHeal: 0,
        repair: 0,
        rangedAttack: 0,
        rangedMassAttack: 0,
        upgrade: 0,
        capacity: 0
    };
    // 计算boost系数
    for (const bodyName in creep.boost) {
        for (const abilityName in boostCoefficientModification) {
            let boostedSum = 0;
            for (const compoundName in creep.boost[bodyName]) {
                if (BOOSTS[bodyName][compoundName][abilityName]) {
                    const boostedNumber = (creep.boost[bodyName] as CompoundType<string>)[compoundName];
                    boostedSum += boostedNumber;
                    boostCoefficientModification[abilityName as keyof CreepOutput["ability"]] +=
                        boostedNumber * BOOSTS[bodyName][compoundName][abilityName];
                    // if (isNaN(boostCoefficientModification[abilityName as keyof CreepOutput["ability"]])) {
                    //     console.log(`${boostedNumber}*${BOOSTS[bodyName][compoundName][abilityName]}===NaN`);
                    // }
                }
            }
            const unBoostedNumber = creepBody[bodyName as BodyPartConstant] - boostedSum;
            boostCoefficientModification[abilityName as keyof CreepOutput["ability"]] += unBoostedNumber;
            boostCoefficientModification[abilityName as keyof CreepOutput["ability"]] /=
                creepBody[bodyName as BodyPartConstant] === 0 ? 1 : creepBody[bodyName as BodyPartConstant];
        }
    }
    for (const abilityName in boostCoefficientModification) {
        if (boostCoefficientModification[abilityName as keyof CreepOutput["ability"]] === 0) {
            boostCoefficientModification[abilityName as keyof CreepOutput["ability"]] = 1;
        }
    }
    // if (isNaN(creepBody.attack * ATTACK_POWER * boostCoefficientModification.attack)) {
    //     console.log(`${creepBody.attack}*${ATTACK_POWER}*${boostCoefficientModification.attack}===NaN`);
    // }
    return {
        use: true,
        body: creepBody,
        boost: creepBoost,
        energyCost: {
            spawnCreep: bodyTools.getEnergyCost(creep.body),
            build: creepBody.work,
            repair: creepBody.work,
            upgrade: creepBody.work
        },
        moveTimePerStep: {
            noLoad: {
                onRoad: Math.ceil(tiredPartValue.noLoad * 1),
                onPlain: Math.ceil(tiredPartValue.noLoad * 2),
                onSwamp: Math.ceil(tiredPartValue.noLoad * 5)
            },
            fullLoad: {
                onRoad: Math.ceil(tiredPartValue.fullLoad * 1),
                onPlain: Math.ceil(tiredPartValue.fullLoad * 2),
                onSwamp: Math.ceil(tiredPartValue.fullLoad * 5)
            }
        },

        ability: {
            attack: creepBody.attack * ATTACK_POWER * boostCoefficientModification.attack,
            build: creepBody.work * BUILD_POWER * boostCoefficientModification.build,
            dismantle: creepBody.work * DISMANTLE_POWER * boostCoefficientModification.dismantle,
            harvest: {
                energy: creepBody.work * HARVEST_POWER * boostCoefficientModification.harvest,
                mineral: creepBody.work * HARVEST_MINERAL_POWER * boostCoefficientModification.harvest,
                deposit: creepBody.work * HARVEST_DEPOSIT_POWER * boostCoefficientModification.harvest
            },
            heal: creepBody.heal * HEAL_POWER * boostCoefficientModification.heal,
            rangedAttack: {
                1: creepBody.ranged_attack * RANGED_ATTACK_POWER * boostCoefficientModification.rangedAttack,
                2: creepBody.ranged_attack * 4 * boostCoefficientModification.rangedAttack,
                3: creepBody.ranged_attack * 1 * boostCoefficientModification.rangedAttack
            },
            rangedMassAttack: creepBody.ranged_attack * 1 * boostCoefficientModification.rangedMassAttack,
            rangedHeal: creepBody.heal * RANGED_HEAL_POWER * boostCoefficientModification.rangedHeal,
            repair: creepBody.work * REPAIR_POWER * boostCoefficientModification.repair,
            upgrade: creepBody.work * UPGRADE_CONTROLLER_POWER * boostCoefficientModification.upgrade,
            capacity: creepBody.carry * CARRY_CAPACITY * boostCoefficientModification.capacity
        }
    };
}

function partialCreepBody(creepBody: Partial<CreepOutput["body"]>): creepBody is CreepOutput["body"] {
    return BODYPARTS_ALL.every(name => {
        return creepBody[name] || creepBody[name] === 0;
    });
}

function partialCreepBoost(creepBoost: Partial<CreepOutput["boost"]>): creepBoost is CreepOutput["boost"] {
    return BODYPARTS_ALL.every(name => {
        return creepBoost[name] || creepBoost[name] === {};
    });
}

interface CreepInput {
    use: boolean;
    body: string;
    boost: { [partName in keyof typeof BOOSTS]?: Partial<CompoundType<partName>> };
}

type CompoundType<partName extends string | number> = { [compoundName in keyof typeof BOOSTS[partName]]: number };

export interface CreepOutput {
    /**
     * 是否使用creep
     *
     * @type {true}
     * @memberof CreepOutput
     */
    use: true;
    /**
     * 身体配件数量
     *
     * @type {({ [name in BodyPartConstant | "total"]: number })}
     * @memberof CreepOutput
     */
    body: { [name in BodyPartConstant | "total"]: number };
    /**
     * 身体部件强化
     *
     * @type {{ [name in BodyPartConstant]: number }}
     * @memberof CreepOutput
     */
    boost: Required<CreepInput["boost"]>;
    /**
     * 能量消耗
     *
     * @type {{ spawnCreep: number }}
     * @memberof CreepOutput
     */
    energyCost: { spawnCreep: number; repair: number; upgrade: number; build: number };
    /**
     * 移动速度
     *
     * @type {number}
     * @memberof harvester
     */
    moveTimePerStep: {
        noLoad: {
            onPlain: number;
            onSwamp: number;
            onRoad: number;
        };
        fullLoad: {
            onPlain: number;
            onSwamp: number;
            onRoad: number;
        };
    };
    /**
     * creep能力值
     *
     * @memberof CreepOutput
     */
    ability: {
        attack: number;
        build: number;
        dismantle: number;
        harvest: {
            energy: number;
            mineral: number;
            deposit: number;
        };
        heal: number;
        rangedAttack: {
            1: number;
            2: number;
            3: number;
        };
        rangedHeal: number;
        rangedMassAttack: number;
        repair: number;
        upgrade: number;
        capacity: number;
    };
}

interface EmptyOutput {
    use: false;
}
