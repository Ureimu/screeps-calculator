import { Entity } from "sourceCalculator/inits";
import { SourceCalculatorModelType } from ".";
import {
    SeparateHarvestAndCarryModelInputData,
    SeparateHarvestAndCarryModelResult,
    SeparateHarvestAndCarryModelStats
} from "./SeparateHarvestAndCarryModel";

export type EntityArgs<T extends SourceCalculatorModelType> = {
    [name in keyof InputData<T>]: Entity<InputData<T>[name][Extract<"type", keyof InputData<T>[name]>]>;
};

export type InputData<T extends SourceCalculatorModelType> = T extends "SeparateHarvestAndCarryModel"
    ? SeparateHarvestAndCarryModelInputData
    : never;

export type SourceCalculatorModelResult<T extends SourceCalculatorModelType> = T extends "SeparateHarvestAndCarryModel"
    ? SeparateHarvestAndCarryModelResult
    : never;

export type Stats<T extends SourceCalculatorModelType> = T extends "SeparateHarvestAndCarryModel"
    ? SeparateHarvestAndCarryModelStats
    : never;