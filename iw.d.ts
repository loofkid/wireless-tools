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

declare interface Iw {
    exec: typeof exec,
    scan: typeof scan,
}

export const iw: Iw;

export const scan: (options: string | Options, callback?: (err: Error, networks: Network[]) => any) => Promise<void> | void;