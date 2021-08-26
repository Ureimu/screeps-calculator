import { initContainer } from "./container";
import { initController } from "./controller";
import { initCreep } from "./creep";
import { initLink } from "./link";
import { initPath } from "./path";
import { initSource } from "./source";
import { initSpawn } from "./spawn";

export type EntityType = keyof initFunctionTypeSet;

export interface initFunctionTypeSet {
    creep: typeof initCreep;
    container: typeof initContainer;
    link: typeof initLink;
    controller: typeof initController;
    path: typeof initPath;
    spawn: typeof initSpawn;
    source: typeof initSource;
}

const initFunctionSet: InitFunctionSet = {
    creep: initCreep,
    container: initContainer,
    link: initLink,
    controller: initController,
    path: initPath,
    spawn: initSpawn,
    source: initSource
};

export function init<T extends EntityType>(inputEntity: InputEntity<T>): Entity<T> {
    return initFunctionSet[inputEntity.type](inputEntity.data as any) as Entity<T>; // TODO  inputEntity.data的类型是什么？
}

export type Entity<T extends EntityType> = ReturnType<InitFunctionSet[T]>;

export type InputEntityData<T extends EntityType> = Parameters<InitFunctionSet[T]>[0];

export interface InputEntity<T extends EntityType> {
    type: T;
    data: InputEntityData<T>;
}

export type InitFunctionSet = {
    [name in EntityType]: initFunctionTypeSet[name];
};
