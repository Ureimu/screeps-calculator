import { SourceCalculatorModel, SourceCalculatorModelType } from "./model";

export function sourceCalculator(model: SourceCalculatorModel<SourceCalculatorModelType>): void {
    const result = model.calculateModel();
    const stats = model.obtainStats();
    const beautifiedStats = model.printBeautifiedStats();
    console.log(result);
    console.log(stats);
    console.log(beautifiedStats);
    return;
}
