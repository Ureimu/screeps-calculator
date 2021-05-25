import { sourceCalculator } from "sourceCalculator/index";
import { assert } from "chai";
import { SeparateHarvestAndCarryModel } from "sourceCalculator/model/SeparateHarvestAndCarryModel";
describe("calculator", () => {
    it("should return right number of out", () => {
        assert.isFunction(sourceCalculator);
        const model = new SeparateHarvestAndCarryModel({
            harvester: { type: "creep", data: [{ use: true, body: "w5c1m3", boost: {} }] },
            carrier: { type: "creep", data: [{ use: true, body: "c9m5w1", boost: { carry: { KH: 5 } } }] },
            container: { type: "container", data: [{ useContainer: true }] },
            source: { type: "source", data: [{ capacity: 3000, powers: {} }] },
            spawn: { type: "spawn", data: [{ powers: {} }] },
            path: {
                type: "path",
                data: [
                    {
                        ownedRoomPathLength: { plain: 0, swamp: 0, road: 30 },
                        reservePathLength: { plain: 10, swamp: 20, road: 10 },
                        outwardsRoomPathLength: { plain: 0, swamp: 0, road: 30 }
                    }
                ]
            },
            link: {
                type: "link",
                data: [{ useLink: true }]
            },
            reserver: {
                type: "creep",
                data: [{ use: true, body: "m2i2", boost: {} }]
            }
        });

        sourceCalculator(model);
        console.log(model.entityList.carrier);
    });
});
