import {ChildProcess} from 'child_process';

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

export interface Network {
    network_id: number;
    ssid: string;
    bssid: string;
    flags: string;
}

declare interface WpaCli {
    status: typeof status,
    bssid: typeof bssid,
    reassociate: typeof reassociate,
    set: typeof set,
    list_networks: typeof list_networks,
    add_network: typeof add_network,
    set_network: typeof set_network,
    enable_network: typeof enable_network,
    disable_network: typeof disable_network,
    remove_network: typeof remove_network,
    select_network: typeof select_network,
    scan: typeof scan,
    scan_results: typeof scan_results,
    save_config: typeof save_config,
}

export const wpacli: WpaCli;

export const status: <T extends ((err: Error, status: Status) => any) | undefined = undefined>(interfaceName: string, callback?: T) => TypeOrPromise<T, Status, ChildProcess>;
export const bssid: <T extends ((err: Error, data: unknown) => any) | undefined = undefined>(interfaceName: string, ap: string, ssid: string, callback?: T) => TypeOrPromise<T, unknown, ChildProcess>;
export const reassociate: <T extends ((err: Error, data: unknown) => any) | undefined = undefined>(interfaceName: string, callback?: T) => TypeOrPromise<T, unknown, ChildProcess>;
export const set: <T extends ((err: Error, data: unknown) => any) | undefined = undefined>(interfaceName: string, variable: string, value: string, callback?: T) => TypeOrPromise<T, unknown, ChildProcess>;
export const list_networks: <T extends ((err: Error, networks: Network[]) => any) | undefined = undefined>(interfaceName: string, callback?: T) => TypeOrPromise<T, Network[], ChildProcess>;
export const add_network: <T extends ((err: Error, data: unknown) => any) | undefined = undefined>(interfaceName: string, callback?: T) => TypeOrPromise<T, unknown, ChildProcess>;
export const set_network: <T extends ((err: Error, data: unknown) => any) | undefined = undefined>(interfaceName: string, id: string, variable: string, value: string, callback?: T) => TypeOrPromise<T, unknown, ChildProcess>;
export const enable_network: <T extends ((err: Error, data: unknown) => any) | undefined = undefined>(interfaceName: string, id: string, callback?: T) => TypeOrPromise<T, unknown, ChildProcess>;
export const disable_network: <T extends ((err: Error, data: unknown) => any) | undefined = undefined>(interfaceName: string, id: string, callback?: T) => TypeOrPromise<T, unknown, ChildProcess>;
export const remove_network: <T extends ((err: Error, data: unknown) => any) | undefined = undefined>(interfaceName: string, id: string, callback?: T) => TypeOrPromise<T, unknown, ChildProcess>;
export const select_network: <T extends ((err: Error, data: unknown) => any) | undefined = undefined>(interfaceName: string, id: string, callback?: T) => TypeOrPromise<T, unknown, ChildProcess>;
export const scan: <T extends ((err: Error, data: unknown) => any) | undefined = undefined>(interfaceName: string, callback?: T) => TypeOrPromise<T, unknown, ChildProcess>;
export const scan_results: <T extends ((err: Error, data: unknown) => any) | undefined = undefined>(interfaceName: string, callback?: T) => TypeOrPromise<T, unknown, ChildProcess>;
export const save_config: <T extends ((err: Error, data: unknown) => any) | undefined = undefined>(interfaceName: string, callback?: T) => TypeOrPromise<T, unknown, ChildProcess>;