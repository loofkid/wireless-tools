import {ChildProcess} from 'child_process';

export interface Status {
    interface: string,
    access_point?: string,
    frequency: number,
    ieee?: string,
    mode: string,
    noise: number,
    quality: number,
    sensitivity: number,
    signal: number,
    ssid?: string,
    unassociated?: boolean,
}

declare interface IwConfig {
    status: typeof status,
    statusAll: typeof statusAll,
}

export const iwconfig: IwConfig;

export const status: <T extends ((err: Error, data: Status) => any) | undefined = undefined>(interfaceName: string, callback?: T) => TypeOrPromise<T, Status, ChildProcess>;
export const statusAll: <T extends ((err: Error, data: Status[]) => any) | undefined = undefined>(callback?: T) => TypeOrPromise<T, Status[], ChildProcess>;