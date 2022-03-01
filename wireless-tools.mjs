/*
 * Copyright (c) 2015 Christopher M. Baker
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */
import hostapd from './hostapd.mjs';
import ifconfig from './ifconfig.mjs';
import iwconfig from './iwconfig.mjs';
import iwlist from './iwlist.mjs';
import iw from './iw.mjs';
import udhcpc from './udhcpc.mjs';
import udhcpd from './udhcpd.mjs';
import wpa_cli from './wpa_cli.mjs';
import wpa_supplicant from './wpa_supplicant.mjs';

export default {
  hostapd: hostapd,
  ifconfig: ifconfig,
  iwconfig: iwconfig,
  iwlist: iwlist,
  iw: iw,
  udhcpc: udhcpc,
  udhcpd: udhcpd,
  wpa: wpa_cli,
  wpa_supplicant: wpa_supplicant,
};

export {
  hostapd,
  ifconfig,
  iwconfig,
  iwlist,
  iw,
  udhcpc,
  udhcpd,
  wpa_cli,
  wpa_supplicant,
}
