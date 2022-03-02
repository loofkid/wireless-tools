import {ChildProcess} from 'child_process';

export interface Options {
    interface: string,
}

declare interface UdhcpC {
    disable: typeof disable,
    enable: typeof enable,
}

export const udhcpc: UdhcpC;

export const disable: <T extends ((err: Error) => any) | undefined = undefined>(interfaceName: string, callback?: T) => TypeOrPromise<T, void, ChildProcess>;
export const enable: <T extends ((err: Error) => any) | undefined = undefined>(options: Options, callback?: T) => TypeOrPromise<T, void, ChildProcess>;