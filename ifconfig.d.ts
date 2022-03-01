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
    ipv4_address?: string,
    ipv4_broadcast?: string,
    ipv4_subnet_mask?: string,
}

declare interface IfConfig {
    status: typeof status,
    statusAll: typeof statusAll,
    down: typeof down,
    up: typeof up,
}

export const ifconfig: IfConfig;

export const status: (interfaceName: string, callback?: (err: Error, data: Status) => any) => Promise<Status> | void;
export const statusAll: (callback?: (err: Error, data: Status[]) => any) => Promise<Status> | void;
export const down: (interfaceName: string, callback?: (err: Error) => any) => Promise<void> | void;
export const up: (options: Options, callback?: (err: Error) => any) => Promise<void> | void;