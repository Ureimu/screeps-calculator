export interface BasicStats {
    /**
     * 滞留的能量值
     *
     * @type {number}
     * @memberof BasicStats
     */
    energyStranded: number;
    /**
     * 挖取的总能量值
     *
     * @type {number}
     * @memberof BasicStats
     */
    energyHarvested: number;
    /**
     * 在孵化creep上花费的能量值
     *
     * @type {number}
     * @memberof BasicStats
     */
    energyOnSpawn: number;
    /**
     * 在孵化creep上花费的时间
     *
     * @type {number}
     * @memberof BasicStats
     */
    timeOnSpawn: number;
    /**
     * 花费的总能量值
     *
     * @type {number}
     * @memberof BasicStats
     */
    energyCost: number;
    /**
     * 扣除花费后的能量净利润值
     *
     * @type {number}
     * @memberof BasicStats
     */
    energyProfit: number;
    /**
     * source的容量
     *
     * @type {number}
     * @memberof BasicStats
     */
    sourceCapacity: number;
    /**
     * 外矿效率
     *
     * @type {number}
     * @memberof BasicStats
     */
    efficiency: number;
    cpuCost: number; // TODO cpu统计
}
