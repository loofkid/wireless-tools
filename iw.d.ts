import {exec} from 'child_process';

export interface Network {
    address: string,
    frequency: number,
    signal: number,
    lastSeenMs: 0,
    ssid?: string,
    channel: number,
    security: string,
}

export interface Options {
    iface: string,
    show_hidden: boolean,
}

export const iw = {
    exec: exec,
    scan: scan,
}

export const scan: (options: string | Options, callback?: (err: Error, networks: Network[]) => any) => Promise<void> | void;