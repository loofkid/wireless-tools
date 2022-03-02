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
    scan: typeof scan,
}

export const iw: Iw;

export const scan: <T extends ((err: Error, networks: Network[]) => any) | undefined = undefined>(options: string | Options, callback?: T) => TypeOrPromise<T, Network[], void>;