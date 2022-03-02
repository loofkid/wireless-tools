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

export const status: <T extends ((err: Error, data: Status) => any) | undefined = undefined>(interfaceName: string, callback?: T) => TypeOrPromise<T, Status, void>;
export const statusAll: <T extends ((err: Error, data: Status[]) => any) | undefined = undefined>(callback?: T) => TypeOrPromise<T, Status[], void>;
export const down: <T extends ((err: Error) => any) | undefined = undefined>(interfaceName: string, callback?: T) => TypeOrPromise<T, void, void>;
export const up: <T extends ((err: Error) => any) | undefined = undefined>(options: Options, callback?: T) => TypeOrPromise<T, void, void>;