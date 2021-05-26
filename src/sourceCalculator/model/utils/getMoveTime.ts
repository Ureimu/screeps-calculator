import { CreepOutput } from "sourceCalculator/inits/creep";
import { PathOutput } from "sourceCalculator/inits/path";

export function getMoveTime(creep: CreepOutput, path: PathOutput, origin: Origin, dest: Dest, load: Load): number {
    const pathMoveTime = {
        inOwnedRoom: 0,
        inOutwardsRoom: 0
    };
    if (origin === "storage") {
        const moveTimeInOwnedRoom =
            path.ownedRoomPathLength.road * creep.moveTimePerStep[load].onRoad +
            path.ownedRoomPathLength.plain * creep.moveTimePerStep[load].onPlain +
            path.ownedRoomPathLength.swamp * creep.moveTimePerStep[load].onSwamp;
        pathMoveTime.inOwnedRoom = moveTimeInOwnedRoom;
    } else if (origin === "link") {
        const moveTimeInOwnedRoom = 4;
        pathMoveTime.inOwnedRoom = moveTimeInOwnedRoom;
    } else if (origin === "spawn") {
        const moveTimeInOwnedRoom =
            path.ownedRoomPathLength.road * creep.moveTimePerStep[load].onRoad +
            path.ownedRoomPathLength.plain * creep.moveTimePerStep[load].onPlain +
            path.ownedRoomPathLength.swamp * creep.moveTimePerStep[load].onSwamp;
        pathMoveTime.inOwnedRoom = moveTimeInOwnedRoom + 5; // 暂时没有使用spawn路径数据，使用storage路径数据代替
    }

    if (dest === "toSource") {
        const moveTimeToSource =
            path.outwardsRoomPathLength.plain * creep.moveTimePerStep[load].onPlain +
            path.outwardsRoomPathLength.swamp * creep.moveTimePerStep[load].onSwamp +
            path.outwardsRoomPathLength.road * creep.moveTimePerStep[load].onRoad;
        pathMoveTime.inOutwardsRoom = moveTimeToSource;
    } else if (dest === "toController") {
        const moveTimeToController =
            path.reservePathLength.plain * creep.moveTimePerStep[load].onPlain +
            path.reservePathLength.swamp * creep.moveTimePerStep[load].onSwamp +
            path.reservePathLength.road * creep.moveTimePerStep[load].onRoad;
        pathMoveTime.inOutwardsRoom = moveTimeToController;
    }

    return pathMoveTime.inOwnedRoom + pathMoveTime.inOutwardsRoom;
}
type Origin = "storage" | "link" | "spawn";
type Dest = "toSource" | "toController";
type Load = "noLoad" | "fullLoad";
