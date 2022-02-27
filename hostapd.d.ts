import {exec} from 'child_process';

export interface Options {
    channel: number,
    driver: string,
    hw_mode: string,
    interface: string,
    ssid: string,
    wpa?: number,
    wpa_passphrase?: string,
}

declare interface HostAPd {
    exec: typeof exec,
    disable: typeof disable,
    enable: typeof enable,
}

export const hostapd: HostAPd;

export const disable: (interface: string, callback?: (err: Error) => any) => NodeJS.Process | Promise<void>;
export const enable: (interface: Options, callback?: (err: Error) => any) => NodeJS.Process | Promise<void>;