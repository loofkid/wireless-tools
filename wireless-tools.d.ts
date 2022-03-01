import { HostAPd, Options as HostAPdOptions } from "./hostapd";
import { IfConfig, Status as IfConfigStatus, Options as IfConfigOptions } from "./ifconfig";
import { Iw, Network as IwNetwork, Options as IwOptions } from "./iw";
import { IwConfig, Status as IwConfigStatus } from "./iwconfig";
import { IwList, Network as IwListNetwork, Options as IwListOptions } from "./iwlist";
import { UdhcpC, Options as UdhcpCOptions} from "./udhcpc";
import { UdhcpD, Options as UdhcpDOptions } from "./udhcpd";
import { WpaCli, Status as WpaCliStatus, Network as WpaCliNetwork } from "./wpa_cli";
import { WpaSupplicant, EnableOptions as WpaSupplicantEnableOptions, ManualOptions as WpaSupplicantManualOptions } from "./wpa_supplicant";

export {
    HostAPdOptions,
    IfConfigStatus,
    IfConfigOptions,
    IwNetwork,
    IwOptions,
    IwConfigStatus,
    IwListNetwork,
    IwListOptions,
    UdhcpCOptions,
    UdhcpDOptions,
    WpaCliStatus,
    WpaCliNetwork,
    WpaSupplicantEnableOptions,
    WpaSupplicantManualOptions,
};
export const hostapd: HostAPd;
export const ifconfig: IfConfig;
export const iw: Iw;
export const iwconfig: IwConfig;
export const iwlist: IwList;
export const udhcpc: UdhcpC;
export const udhcpd: UdhcpD;
export const wpa_cli: WpaCli;
export const wpa_supplicant: WpaSupplicant;

declare interface WirelessTools {
    hostapd: HostAPd,
    ifconfig: IfConfig,
    iwconfig: IwConfig,
    iwlist: IwList,
    iw: Iw,
    udhcpc: UdhcpC,
    udhcpd: UdhcpD,
    wpa: WpaCli,
    wpa_supplicant: WpaSupplicant,
}

export const wireless_tools: WirelessTools;