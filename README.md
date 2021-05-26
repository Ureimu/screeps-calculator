# screeps-calculator

A calculator for screeps which could calculate, such as, how many energy points you can profit from mining a source based on the creep body you used and source information.

As there are so many ways to mining a source, you could meet really a lot bugs when using. It will take a lot of time to improve the calculator to stable, and we need your help to find these bugs out. Just feel free to raise any issue.

## Usage

```
npm install screeps-calculator
```

typescript:

```ts
//(somewhere in your screeps code)
import { sourceCalculator, SeparateHarvestAndCarryModel } from "screeps-calculator";
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
const result = sourceCalculator(model);
console.log(result.stats);
```

javascript:

```js
//(somewhere in your screeps code)
const calculator = require("screeps-calculator");
const model = new calculator.SeparateHarvestAndCarryModel({
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
const result = calculator.sourceCalculator(model);
console.log(result.stats);
```

As you run the code above, there should be some output in game console about outwardsSource.

In fact, you can also just use model's method:

typescript:

```ts
//(somewhere in your screeps code)
import { sourceCalculator, SeparateHarvestAndCarryModel } from "screeps-calculator";
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
const result = model.calculateModel();
console.log(result.stats);
```

`model.calculateModel` has the same output as `sourceCalculator(model)` .
