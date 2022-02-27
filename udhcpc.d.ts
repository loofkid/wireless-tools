import {exec, type ChildProcess} from 'child_process';

export interface Options {
    interface: string,
}

declare interface UdhcpC {
    exec: typeof exec,
    disable: typeof disable,
    enable: typeof enable,
}

export const udhcpc: UdhcpC;

export const disable: (interface: string, callback?: (err: Error) => any) => ChildProcess | Promise<void>;
export const enable: (options: Options, callback?: (err: Error) => any) => ChildProcess | Promise<void>;