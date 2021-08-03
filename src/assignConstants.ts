/* eslint-disable @typescript-eslint/no-var-requires */
export function assignConstants(): void {
    global._.assign(global, require("@screeps/common/lib/constants"));
}
