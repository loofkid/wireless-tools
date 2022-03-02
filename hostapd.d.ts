export interface Options {
    channel: number,
    driver: string,
    hw_mode: string,
    interface: string,
    ssid: string,
    wpa?: number,
    wpa_passphrase?: string,
}

declare interface HostAPd {
    disable: typeof disable,
    enable: typeof enable,
}

export const hostapd: HostAPd;

export const disable: <T extends ((err: Error) => any) | undefined = undefined>(interfaceName: string, callback?: T) => TypeOrPromise<T, void, import("child_process").ChildProcess>;
export const enable: <T extends ((err: Error) => any) | undefined = undefined>(interface: Options, callback?: T) => TypeOrPromise<T, void, import("child_process").ChildProcess>;