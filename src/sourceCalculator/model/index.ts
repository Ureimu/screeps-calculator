import { init } from "../inits";
import { EntityArgs, InputData, models, SourceCalculatorModelResult, Stats } from "./type";

export type SourceCalculatorModelType = keyof SourceCalculatorModelSet;
export type SourceCalculatorModelSet = typeof models;

export abstract class SourceCalculatorModel<T extends SourceCalculatorModelType> {
    protected stats: Stats<T> | undefined;
    protected result: SourceCalculatorModelResult<T> | undefined;
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
    public obtainResult(): SourceCalculatorModelResult<T> {
        if (!this.result)
            throw new Error("Result not generated. Use method calculateModel() before using method obtainResult().");
        return this.result;
    }
    public obtainStats(): Stats<T> {
        if (!this.stats)
            throw new Error("Stats not generated. Use method calculateModel() before using method obtainStats().");
        return this.stats;
    }
    public abstract printBeautifiedStats(): string;
}
