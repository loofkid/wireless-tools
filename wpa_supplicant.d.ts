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

export const disable: (interfaceName: string, callback?: (err: Error) => any) => ChildProcess | Promise<void>;
export const enable: (options: EnableOptions, callback?: (err: Error) => any) => ChildProcess | Promise<void>;
export const manual: (options: ManualOptions, callback?: (err: Error) => any) => ChildProcess | Promise<void>;