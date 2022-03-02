import {ChildProcess} from 'child_process';

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
    enable: typeof enable,
    disable: typeof disable,
}

export const udhcpd: UdhcpD;

export const enable: <T extends ((err: Error) => any) | undefined = undefined>(options: Options, callback?: T) => TypeOrPromise<T, void, ChildProcess>;
export const disable: <T extends ((err: Error) => any) | undefined = undefined>(interfaceName: string, callback?: T) => TypeOrPromise<T, void, ChildProcess>;