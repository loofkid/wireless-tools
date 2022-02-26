import {exec} from 'child_process';

export interface Status {
    interface: string,
    link: string,
    address?: string,
    ipv4_address: string,
    ipv4_broadcast?: string,
    ipv4_subnet_mask: string,
    up: boolean,
    running?: boolean,
    multicast?: boolean,
    loobpack?: boolean,
    broadcast?: boolean,
}

export interface Options {
    interface: string,
    ipv4_address: string,
    ipv4_broadcast: string,
    ipv4_subnet_mask: string,
}

export const ifconfig = {
    exec: exec,
    status: status,
    down: down,
    up: up,
}

declare const status: (interface?: string | ((err: Error, data: Status) => any), callback?: (err: Error, data: Status) => any) => Promise<Status> | void;
declare const down: (interface: string, callback?: (err: Error) => any) => Promise<void> | void;
declare const up: (options: Options, callback?: (err: Error) => any) => Promise<void> | void;