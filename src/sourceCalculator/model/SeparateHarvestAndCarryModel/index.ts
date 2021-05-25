import { EntityType, InputEntity } from "../../inits";
import { BasicStats } from "../../stats/type";
import { SourceCalculatorModel } from "..";
import { EntityArgs, InputData, SourceCalculatorModelResult, Stats } from "../type";
import { CarrierData, ContainerData, HarvesterData, ReserverData } from "./type";

type ModelName = "SeparateHarvestAndCarryModel";
export class SeparateHarvestAndCarryModel extends SourceCalculatorModel<ModelName> {
    private stats: Stats<ModelName> | undefined;
    public constructor(inputArgs: InputData<ModelName>) {
        super(inputArgs);
    }
    public calculateModel(): SourceCalculatorModelResult<ModelName> {
        const { harvester, carrier, reserver, container, source, path, link, spawn } = this.entityList;
        if (container.useContainer === false) throw new Error("SourceCalculatorModel不支持不使用container");
        if (harvester.use === false) throw new Error("SourceCalculatorModel不支持不使用harvester");
        if (carrier.use === false) throw new Error("SourceCalculatorModel不支持不使用carrier");
        const harvesterData: HarvesterData = {
            energyCost: {},
            inRoundGeneration: {},
            spawnTime: spawn.spawnSpeedPower * harvester.body.total
        };
        const carrierData: CarrierData = {
            energyCost: {},
            inRoundGeneration: {},
            inRoundCarry: {},
            spawnTime: spawn.spawnSpeedPower * carrier.body.total
        };
        const reserverData: ReserverData = {
            energyCost: {}
        };
        const containerData: ContainerData = {
            perDecay: {},
            inRoundGeneration: {}
        };
        const pathLength = path.outwardsRoomPathLength.road + path.ownedRoomPathLength.road;
        harvesterData.workTime = CREEP_LIFE_TIME - pathLength * harvester.moveTimePerStep.noLoad.onRoad; // 工作总时间（不包含移动）
        carrierData.workTime = CREEP_LIFE_TIME - pathLength * carrier.moveTimePerStep.noLoad.onRoad;
        containerData.perDecay.repairTimeCost = Math.ceil(
            container.perDecay.repairEnergyCost / harvester.energyCost.repair
        );
        harvesterData.inRoundGeneration.repairContainerTime =
            containerData.perDecay.repairTimeCost * container.perDecay.countInRoundGeneration;
        harvesterData.inRoundGeneration.harvestTime = Math.min(
            ENERGY_REGEN_TIME - harvesterData.inRoundGeneration.repairContainerTime,
            Math.ceil(source.capacity / harvester.ability.harvest.energy)
        );
        harvesterData.inRoundGeneration.harvestedEnergy = Math.min(
            source.capacity,
            harvester.ability.harvest.energy * harvesterData.inRoundGeneration.harvestTime
        );
        containerData.inRoundGeneration.gainedEnergy =
            Math.min(harvesterData.inRoundGeneration.harvestedEnergy, source.capacity) -
            container.perDecay.repairEnergyCost * container.perDecay.countInRoundGeneration;
        containerData.inRoundGeneration.gainedEnergyPerTick =
            containerData.inRoundGeneration.gainedEnergy / ENERGY_REGEN_TIME;
        carrierData.inRoundCarry.fillTime =
            carrier.ability.capacity / containerData.inRoundGeneration.gainedEnergyPerTick;
        carrierData.inRoundCarry.waitForRepairTime =
            (carrierData.inRoundCarry.fillTime / CONTAINER_DECAY_TIME) * containerData.perDecay.repairTimeCost;
        carrierData.inRoundCarry.waitTime = Math.ceil(
            carrierData.inRoundCarry.fillTime + carrierData.inRoundCarry.waitForRepairTime
        );
        carrierData.inRoundCarry.transitTime = link.useLink
            ? path.outwardsRoomPathLength.road *
              (carrier.moveTimePerStep.noLoad.onRoad + carrier.moveTimePerStep.fullLoad.onRoad)
            : pathLength * (carrier.moveTimePerStep.noLoad.onRoad + carrier.moveTimePerStep.fullLoad.onRoad);
        carrierData.inRoundCarry.time = Math.max(
            carrierData.inRoundCarry.transitTime,
            carrierData.inRoundCarry.waitTime
        );
        carrierData.inRoundGeneration.transportCapability =
            (ENERGY_REGEN_TIME / carrierData.inRoundCarry.time) * carrier.ability.capacity;
        carrierData.maxCarrierNum = Math.min(
            Math.ceil(ENERGY_REGEN_TIME / carrierData.inRoundCarry.waitTime),
            Math.round(containerData.inRoundGeneration.gainedEnergy / carrierData.inRoundGeneration.transportCapability)
        );
        carrierData.transportCapability =
            carrierData.inRoundGeneration.transportCapability * (CREEP_LIFE_TIME / ENERGY_REGEN_TIME);
        carrierData.energyCost.spawnCreeps = carrier.energyCost.spawnCreep * carrierData.maxCarrierNum;
        harvesterData.energyCost.spawnCreeps = harvester.energyCost.spawnCreep;
        harvesterData.energyCost.repairContainer = Math.ceil(
            (harvesterData.workTime / CONTAINER_DECAY_TIME) * container.perDecay.repairEnergyCost
        );
        harvesterData.inRoundGeneration.countInLife = harvesterData.workTime / ENERGY_REGEN_TIME;
        carrierData.inRoundGeneration.countInLife = carrierData.workTime / ENERGY_REGEN_TIME;
        carrierData.energyCost.repairRoad =
            (((carrierData.maxCarrierNum * carrierData.inRoundGeneration.countInLife * 2 + 1) * carrier.body.total +
                harvester.body.total +
                CREEP_LIFE_TIME) /
                ROAD_DECAY_TIME) *
            path.outwardsRoomPathLength.road;
        if (reserver.use === true) {
            reserverData.workTime =
                CREEP_CLAIM_LIFE_TIME -
                (path.ownedRoomPathLength.road +
                    path.reservePathLength.plain * reserver.moveTimePerStep.noLoad.onPlain +
                    path.reservePathLength.swamp); // 总工作时间（只包括执行reserve动作的时间）
            reserverData.reservePoint = Math.min(
                Math.max(reserverData.workTime * (reserver.body.claim - 1), 0),
                CONTROLLER_RESERVE_MAX
            );
            reserverData.spawnInterval = reserverData.workTime + reserverData.reservePoint;
            reserverData.energyCost.spawnCreeps = Math.ceil(
                reserver.energyCost.spawnCreep * (CREEP_LIFE_TIME / reserverData.spawnInterval)
            );
            reserverData.spawnTime = spawn.spawnSpeedPower * reserver.body.total;
        }

        const energyHarvested = Math.round(
            harvesterData.inRoundGeneration.harvestedEnergy * (CREEP_LIFE_TIME / ENERGY_REGEN_TIME)
        );
        const energyStranded =
            energyHarvested - harvesterData.energyCost.repairContainer - carrierData.transportCapability;
        const energyCost = Math.round(
            harvesterData.energyCost.spawnCreeps +
                harvesterData.energyCost.repairContainer +
                carrierData.energyCost.spawnCreeps +
                carrierData.energyCost.repairRoad +
                (reserver.use === true ? (reserverData.energyCost.spawnCreeps as number) : 0)
        );
        const energyOnSpawn =
            harvesterData.energyCost.spawnCreeps +
            carrierData.energyCost.spawnCreeps +
            (reserver.use === true ? (reserverData.energyCost.spawnCreeps as number) : 0);
        const timeOnSpawn = Math.round(
            harvesterData.spawnTime * (CREEP_LIFE_TIME / harvesterData.workTime) +
                carrierData.spawnTime * carrierData.maxCarrierNum * (CREEP_LIFE_TIME / carrierData.workTime) +
                (reserver.use === true ? (reserverData.spawnTime as number) : 0) *
                    (CREEP_LIFE_TIME / (reserver.use === true ? (reserverData.spawnInterval as number) : 0))
        );
        const energyProfit = Math.round(energyHarvested - energyCost - energyStranded);
        const stats: Stats<ModelName> = {
            energyHarvested,
            energyStranded,
            energyCost,
            energyProfit,
            energyOnSpawn,
            energyOnRepair: harvesterData.energyCost.repairContainer + carrierData.energyCost.repairRoad,
            timeOnSpawn,
            efficiency: (energyProfit / energyHarvested) * 100,
            cpuCost: 0,
            sourceCapacity: source.capacity
        };
        this.stats = stats;
        return {
            entityList: this.entityList,
            harvesterData,
            carrierData,
            reserverData,
            containerData,
            stats
        };
    }
    public obtainStats(): Stats<ModelName> {
        if (!this.stats)
            throw new Error("Stats not generated. Use method calculateModel() before using method obtainStats().");
        return this.stats;
    }
    public printBeautifiedStats(): string {
        if (!this.stats)
            throw new Error(
                "Stats not generated. Use method calculateModel() before using method printBeautifiedStats()."
            );
        return JSON.stringify(this.stats, undefined, 4);
    }
}

interface InputDataType {
    [name: string]: EntityType;
    harvester: "creep";
    carrier: "creep";
    container: "container";
    source: "source";
    path: "path";
    link: "link";
    reserver: "creep";
    spawn: "spawn";
}

export type SeparateHarvestAndCarryModelInputData = {
    [name in keyof InputDataType]: InputEntity<InputDataType[name]>;
};

export interface SeparateHarvestAndCarryModelResult {
    entityList: EntityArgs<ModelName>;
    harvesterData: HarvesterData;
    carrierData: CarrierData;
    reserverData: ReserverData;
    containerData: ContainerData;
    stats: Stats<ModelName>;
}

export interface SeparateHarvestAndCarryModelStats extends BasicStats {
    /**
     * 在维修上花费的能量值
     *
     * @type {(number | string)}
     * @memberof Stats
     */
    energyOnRepair?: number;
}
