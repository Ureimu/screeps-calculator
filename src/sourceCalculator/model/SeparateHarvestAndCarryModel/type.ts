import { BasicStats } from "sourceCalculator/stats/type";

export interface HarvesterData {
    /**
     * creep一生的能量消耗
     *
     * @type {{
     *         spawnCreeps?: number;
     *         repairContainer?: number;
     *     }}
     * @memberof harvester
     */
    energyCost: {
        /**
         * 孵化能量消耗
         *
         * @type {number}
         */
        spawnCreeps?: number;
        /**
         * 修container能量消耗
         *
         * @type {number}
         */
        repairContainer?: number;
    };
    /**
     * 孵化时间
     *
     * @type {number}
     * @memberof HarvesterData
     */
    spawnTime: number;
    /**
     * 维修时消耗能量的速率
     *
     * @type {number}
     * @memberof harvester
     */
    repairEnergyCostSpeed?: number;
    /**
     * 工作时长，也是孵化间隔时长
     *
     * @type {number}
     * @memberof harvester
     */
    workTime?: number;
    /**
     * 采集能量速率
     *
     * @type {number}
     * @memberof harvester
     */
    harvestSpeed?: number;
    /**
     * 一轮能量生成(source regeneration)时的属性值
     *
     * @type {({
     *         countInLife?: number | string;
     *         repairContainerTime?: number;
     *         harvestTime?: number;
     *         harvestedEnergy?: number;
     *     })}
     * @memberof harvester
     */
    inRoundGeneration: {
        /**
         * 一生有几次能量生成
         *
         * @type {(number | string)}
         */
        countInLife?: number | string;
        /**
         * 花了多少时间修理container
         *
         * @type {number}
         */
        repairContainerTime?: number;
        /**
         * 花了多少时间采集
         *
         * @type {number}
         */
        harvestTime?: number;
        /**
         * 采集了多少能量
         *
         * @type {number}
         */
        harvestedEnergy?: number;
    };
}

export interface CarrierData {
    /**
     * 工作时长
     *
     * @type {number}
     * @memberof carrier
     */
    workTime?: number;
    /**
     * creep一生的能量消耗
     *
     * @type {({
     *         spawnCreeps?: number;
     *         repairRoad?: number | string;
     *     })}
     * @memberof carrier
     */
    energyCost: {
        /**
         * 孵化能量消耗
         *
         * @type {number}
         */
        spawnCreeps?: number;
        /**
         * 维修路能量消耗
         *
         * @type {(number | string)}
         */
        repairRoad?: number | string;
    };
    /**
     * 孵化时间
     *
     * @type {number}
     * @memberof CarrierData
     */
    spawnTime: number;
    /**
     * 为了运输所有能量，所需要的最多的carrier数量
     *
     * @type {number}
     * @memberof carrier
     */
    maxCarrierNum?: number;
    transportCapability?: number;
    /**
     *  一轮搬运中的数据
     *
     * @type {({
     *         fillTime?: number | string;
     *         waitForRepairTime?: number | string;
     *         waitTime?: number;
     *         transitTime?: number;
     *         time?: number;
     *     })}
     * @memberof carrier
     */
    inRoundCarry: {
        /**
         * 装满所需时间
         *
         * @type {(number | string)}
         */
        fillTime?: number | string;
        /**
         * 平均等待container维修时间
         *
         * @type {(number | string)}
         */
        waitForRepairTime?: number | string;
        /**
         * 总等待时间
         *
         * @type {number}
         */
        waitTime?: number;
        /**
         * 运输路上花费的时间
         *
         * @type {number}
         */
        transitTime?: number;
        /**
         * 一轮搬运完成所需时间
         *
         * @type {number}
         */
        time?: number;
    };
    inRoundGeneration: {
        /**
         * 一生中有几个一轮
         *
         * @type {(number | string)}
         */
        countInLife?: number | string;
        /**
         * 在一轮能量生成中的运输量
         *
         * @type {number}
         */
        transportCapability?: number;
    };
}

export interface ReserverData {
    /**
     * 工作时长
     *
     * @type {number}
     * @memberof reserver
     */
    workTime?: number;
    /**
     * 一生使controller增加的预定时间
     *
     * @type {number}
     * @memberof reserver
     */
    reservePoint?: number;
    /**
     * 一生中的能量消耗
     *
     * @type {({
     *         spawnCreeps?: number;
     *         repairRoad?: number | string;
     *     })}
     * @memberof reserver
     */
    energyCost: {
        spawnCreeps?: number;
        /**
         * 维修路能量消耗
         *
         * @type {(number | string)}
         */
        repairRoad?: number | string;
    };
    /**
     * 孵化时间
     *
     * @type {number}
     * @memberof ReserverData
     */
    spawnTime?: number;
    /**
     * 出生间隔
     *
     * @type {number}
     * @memberof reserver
     */
    spawnInterval?: number;
}

export interface ContainerData {
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
        /**
         * 修理container花费的时间
         *
         * @type {number}
         */
        repairTimeCost?: number;
    };
    /**
     * 一轮能量生成(source regeneration)时的属性值
     *
     * @type {({
     *         gainedEnergy?: number;
     *         gainedEnergyPerTick?: number | string;
     *     })}
     * @memberof container
     */
    inRoundGeneration: {
        /**
         * 获得的能量
         *
         * @type {number}
         */
        gainedEnergy?: number;
        /**
         * 每tick获得的能量
         *
         * @type {(number | string)}
         */
        gainedEnergyPerTick?: number | string;
    };
}
