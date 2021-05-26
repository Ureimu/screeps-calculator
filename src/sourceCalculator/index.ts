import { SourceCalculatorModel, SourceCalculatorModelType } from "./model";
import { SourceCalculatorModelResult } from "./model/type";

export function sourceCalculator(
    model: SourceCalculatorModel<SourceCalculatorModelType>
): SourceCalculatorModelResult<SourceCalculatorModelType> {
    const result = model.calculateModel();
    // console.log(result);
    return result;
}
