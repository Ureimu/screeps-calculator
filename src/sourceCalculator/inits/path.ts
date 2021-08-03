export function initPath(...[pathInput]: [PathInput]): PathOutput {
    return pathInput;
}
// TODO 是否有必要把路径分开计算？
/*
目前没有考虑storage和spawn路径不通用的情况，也没有考虑controller与source路径起点不通用的情况。
但是在一般条件下，storage和spawn应该离得相当近，而controller与source的路径起点和实际移动起点相比也应该差距不大。
如果决定要改，请把[getMoveTime]一同改了。
也可以考虑合并getMoveTime到该文件与该函数输出。
*/

export interface PathInput {
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
        /**
         * 所有路径总hit等效为全建在平原上的路径数
         *
         * @type {number}
         */
        cost: number;
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
        /**
         * 所有路径总hit等效为全建在平原上的路径数
         *
         * @type {number}
         */
        cost: number;
    };
}

export type PathOutput = PathInput;
