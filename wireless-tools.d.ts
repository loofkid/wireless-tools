import { hostapd, type Options as HostAPdOptions } from "./hostapd";
import { ifconfig, type Status as IfConfigStatus, type Options as IfConfigOptions } from "./ifconfig";
import { iw, type Network as IwNetwork, type Options as IwOptions } from "./iw";

export type HostAPdOptions = HostAPdOptions;
export const hostapd = hostapd;

export type IfConfigStatus = IfConfigStatus;
export type IfConfigOptions = IfConfigOptions;
export const ifconfig = ifconfig;

export type IwNetwork = IwNetwork;
export type IwOptions = IwOptions;
export const iw = iw;