import {exec, ChildProcess} from 'child_process';

export interface Options {
    interface: string,
    start: string,
    end: string,
    option: {
        router: string,
        subnet: string,
        dns: string[],
    }
}

declare interface UdhcpD {
    exec: typeof exec,

}

export const udhcpd: UdhcpD;

export const enable: (options: Options, callback?: (err: Error) => any) => ChildProcess | Promise<void>;
export const disable: (interface: string, callback?: (err: Error) => any) => ChildProcess | Promise<void>;