export function initPath(...[pathInput]: [PathInput]): PathInput {
    return pathInput;
}

interface PathInput {
    /**
     * 自己房间内的路径长度，这一段不会计入维修花费
     *
     * @type {number}
     */
    ownedRoomPathLength: {
        road: number;
        swamp: number;
        plain: number;
    };
    /**
     * 外矿路径长度
     *
     * @type {number}
     */
    outwardsRoomPathLength: {
        road: number;
        swamp: number;
        plain: number;
    };
    /**
     * 预定路径长度。（一般没有建路）
     *
     * @type {number}
     */
    reservePathLength: {
        road: number;
        swamp: number;
        plain: number;
    };
}
