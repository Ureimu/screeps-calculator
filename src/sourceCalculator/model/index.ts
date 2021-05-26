import { init, InitFunctionSet } from "../inits";
import { SeparateHarvestAndCarryModel } from "./SeparateHarvestAndCarryModel";
import { EntityArgs, InputData, models, SourceCalculatorModelResult, Stats } from "./type";

export type SourceCalculatorModelType = keyof SourceCalculatorModelSet;
export type SourceCalculatorModelSet = typeof models;

export abstract class SourceCalculatorModel<T extends SourceCalculatorModelType> {
    public entityList: EntityArgs<T>;
    public constructor(public inputArgs: InputData<T>) {
        const entityList: Partial<EntityArgs<T>> = {};
        for (const name in this.inputArgs) {
            entityList[name] = init(this.inputArgs[name]) as Partial<EntityArgs<T>>[Extract<
                keyof InputData<T>,
                string
            >];
        }
        this.entityList = entityList as EntityArgs<T>;
    }
    public abstract calculateModel(): SourceCalculatorModelResult<T>;
    public abstract obtainStats(): Stats<T>;
    public abstract printBeautifiedStats(): string;
}
