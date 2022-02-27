import {exec, type ChildProcess} from 'child_process';

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
    exec: typeof exec,
    status: typeof status,
    statusAll: typeof statusAll,
}

export const iwconfig: IwConfig;

export const status: (interface: string, callback?: (err: Error, data: Status) => any) => Promise<Status> | ChildProcess;
export const statusAll: (callback?: (err: Error, data: Status[]) => any) => Promise<Status>[] | ChildProcess;