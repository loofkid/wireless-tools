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

export const hostapd = {
    exec: exec,
    disable: disable,
    enable: enable,
}

declare const disable: (interface: string, callback?: (err: Error) => any) => NodeJS.Process | Promise<void>;
declare const enable: (interface: Options, callback?: (err: Error) => any) => NodeJS.Process | Promise<void>;