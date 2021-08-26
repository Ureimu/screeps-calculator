import { assert } from "chai";
import { SeparateHarvestAndCarryModel, sourceCalculator } from "index";
import { SeparateHarvestAndCarryModelInputData } from "sourceCalculator/model/SeparateHarvestAndCarryModel";

describe("calculator", () => {
    it("should return right number of out", () => {
        assert.isFunction(sourceCalculator);
        const data: SeparateHarvestAndCarryModelInputData = {
            harvester: { type: "creep", data: { use: true, body: "w3c1m3", boost: {} } },
            carrier: { type: "creep", data: { use: true, body: "c9m5w1", boost: {} } },
            container: { type: "container", data: { useContainer: true } },
            source: { type: "source", data: { capacity: 1500, powers: {} } },
            spawn: { type: "spawn", data: { powers: {} } },
            path: {
                type: "path",
                data: {
                    ownedRoomPathLength: { plain: 0, swamp: 0, road: 30 },
                    reservePathLength: { plain: 10, swamp: 0, road: 0, cost: 0 },
                    outwardsRoomPathLength: { plain: 20, swamp: 0, road: 0, cost: 0 }
                }
            },
            link: {
                type: "link",
                data: { useLink: false }
            },
            reserver: {
                type: "creep",
                data: { use: false, body: "m2i2", boost: {} }
            }
        };
        const model = new SeparateHarvestAndCarryModel(data);

        sourceCalculator(model);
        console.log(model.obtainStats());
        console.log(model.entityList);
        console.log(JSON.stringify(data));
        console.log(JSON.stringify(data).length);
    });
});
