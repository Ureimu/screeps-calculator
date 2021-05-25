import { powerLevels } from "./type";

export function initSource(...[source]: [SourceInput]): SourceOutput {
    return {
        capacity: source.capacity,
        powers: {
            [PWR_REGEN_SOURCE]: (source.powers[PWR_REGEN_SOURCE] ? source.powers[PWR_REGEN_SOURCE] : 0) as powerLevels
        }
    };
}

interface SourceInput {
    capacity: number;
    powers: {
        [PWR_REGEN_SOURCE]?: powerLevels; // power效果等级
    };
}

interface SourceOutput {
    capacity: number;
    powers: {
        [PWR_REGEN_SOURCE]: powerLevels; // power效果等级
    };
}
