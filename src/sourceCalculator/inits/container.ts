export function initContainer(...[containerInput]: [ContainerInput]): ContainerOutput {
    if (containerInput.useContainer) {
        return {
            useContainer: true,
            perDecay: {
                // 每次老化时的属性
                countInRoundGeneration: ENERGY_REGEN_TIME / CONTAINER_DECAY_TIME, // 在一次能量生成期间的老化次数
                repairEnergyCost: CONTAINER_DECAY / REPAIR_POWER // 每次老化修理container花费的能量
            }
        };
    } else {
        return { useContainer: false };
    }
}

interface ContainerInput {
    useContainer: boolean;
}

type ContainerOutput =
    | {
          useContainer: true;
          /**
           * 每次老化时的属性值
           *
           * @type {{
           *         countInRoundGeneration: number;
           *         repairTimeCost?: number;
           *         repairEnergyCost: number;
           *     }}
           * @memberof container
           */
          perDecay: {
              countInRoundGeneration: number;
              /**
               * 修理container花费的能量
               *
               * @type {number}
               */
              repairEnergyCost: number;
          };
      }
    | { useContainer: false };
