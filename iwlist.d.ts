export interface Network {
    address: string,
    ssid?: string,
    mode: string,
    frequency: number,
    channel: number,
    security: string,
    quality: number,
    signal: number,
}

export interface Options {
    iface: string,
    show_hidden?: boolean,
    ssid?: string,
}

declare interface IwList {
    scan: typeof scan,
}

export const iwlist: IwList;

export const scan: <T extends ((err: Error, networks: Network[]) => any) | undefined = undefined>(options: Options | string, callback?: T) => TypeOrPromise<T, Network[], void>;