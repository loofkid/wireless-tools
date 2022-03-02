import {ChildProcess} from 'child_process';

export interface EnableOptions {
    interface: string,
    ssid: string,
    passphrase?: string,
    driver: string,
}

export interface ManualOptions {
    interface: string,
    drivers: string[],
}

declare interface WpaSupplicant {
    disable: typeof disable,
    enable: typeof enable,
    manual: typeof manual,
}

export const wpa_supplicant: WpaSupplicant;

export const disable: <T extends ((err: Error) => any) | undefined = undefined>(interfaceName: string, callback?: T) => TypeOrPromise<T, void, ChildProcess>;
export const enable: <T extends ((err: Error) => any) | undefined = undefined>(options: EnableOptions, callback?: T) => TypeOrPromise<T, void, ChildProcess>;
export const manual: <T extends ((err: Error) => any) | undefined = undefined>(options: ManualOptions, callback?: T) => TypeOrPromise<T, void, ChildProcess>;