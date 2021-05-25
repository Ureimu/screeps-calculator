import { powerLevels } from "./type";

export function initSpawn(...[spawnInput]: [SpawnInput]): SpawnOutput {
    spawnInput.powers[PWR_OPERATE_SPAWN] = spawnInput.powers[PWR_OPERATE_SPAWN]
        ? spawnInput.powers[PWR_OPERATE_SPAWN]
        : 0;
    const actualPowerEffect = spawnInput.powers[PWR_OPERATE_SPAWN]
        ? POWER_INFO[PWR_OPERATE_SPAWN].effect[(spawnInput.powers[PWR_OPERATE_SPAWN] as number) - 1]
        : 1;
    return {
        ...spawnInput,
        spawnSpeedPower: 3 * actualPowerEffect
    } as SpawnOutput;
}

interface SpawnInput {
    powers: {
        [PWR_OPERATE_SPAWN]?: powerLevels;
    };
}

interface SpawnOutput {
    spawnSpeedPower: number;
    powers: {
        [PWR_OPERATE_SPAWN]: powerLevels;
    };
}
