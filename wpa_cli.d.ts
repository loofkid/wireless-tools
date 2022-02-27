import {exec, ChildProcess} from 'child_process';

export interface Status {
    bssid: string,
    frequency: number,
    mode: string,
    key_mgmt: string,
    ssid: string,
    pairwise_cipher: string,
    group_cipher: string,
    p2p_device_address: string,
    wpa_state: string,
    ip: string,
    mac: string,
    uuid: string,
    id: number,
}

declare interface WpaCli {
    exec: typeof exec,
    status: typeof status,
    bssid: typeof bssid,
    reassociate: typeof reassociate,
    set: typeof set,
    add_network: typeof add_network,
    set_network: typeof set_network,
    enable_network: typeof enable_network,
    disable_network: typeof disable_network,
    remove_network: typeof remove_network,
    scan: typeof scan,
    scan_results: typeof scan_results,
    save_config: typeof save_config,
}

export const wpacli: WpaCli;

export const status: (interface: string, callback?: (err: Error, status: Status) => any) => ChildProcess | Promise<Status[]>;
export const bssid: (interface: string, ap: string, ssid: string, callback?: (err: Error, data: unknown) => any) => ChildProcess | Promise<unknown>;
export const reassociate: (interface: string, callback?: (err: Error, data: unknown) => any) => ChildProcess | Promise<unknown>;
export const set: (interface: string, variable: string, value: string, callback?: (err: Error, data: unknown) => any) => ChildProcess | Promise<unknown>;
export const add_network: (interface: string, callback?: (err: Error, data: unknown) => any) => ChildProcess | Promise<unknown>;
export const set_network: (interface: string, id: string, variable: string, value: string, callback?: (err: Error, data: unknown) => any) => ChildProcess | Promise<unknown>;
export const enable_network: (interface: string, id: string, callback?: (err: Error, data: unknown) => any) => ChildProcess | Promise<unknown>;
export const disable_network: (interface: string, id: string, callback?: (err: Error, data: unknown) => any) => ChildProcess | Promise<unknown>;
export const remove_network: (interface: string, id: string, callback?: (err: Error, data: unknown) => any) => ChildProcess | Promise<unknown>;
export const scan: (interface: string, callback?: (err: Error, data: unknown) => any) => ChildProcess | Promise<unknown>;
export const scan_results: (interface: string, callback?: (err: Error, data: unknown) => any) => ChildProcess | Promise<unknown>;
export const save_config: (interface: string, callback?: (err: Error, data: unknown) => any) => ChildProcess | Promise<unknown>;