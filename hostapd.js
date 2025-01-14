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

import { exec } from 'child_process';
import { promisify } from 'util';

/**
 * The **hostpad disable** command is used to stop hosting an access point
 * on a specific wireless interface.
 *
 * @static
 * @category hostapd
 * @param {string} interfaceName The network interface of the access point.
 * @param {function} [callback] The callback function.
 * @returns {process|Promise<void>} The child process.
 * @example
 *
 * var hostapd = require('wireless-tools/hostapd');
 *
 * hostapd.disable('wlan0', function(err) {
 *   // no longer hosting the access point
 * });
 *
 */
export const disable = (interfaceName, callback) => {
  if (callback) {
    var file = interfaceName + '-hostapd.conf';

    return exec('kill `pgrep -f "^hostapd -B ' + file + '"` || true',
      callback);
  }
  else {
    return promisify(disable)(interfaceName);
  }
}

/**
 * The **hostpad enable** command is used to host an access point
 * on a specific wireless interface.
 *
 * @static
 * @category hostapd
 * @param {object} options The access point configuration.
 * @param {function} [callback] The callback function.
 * @returns {process|Promise<void>} The child process.
 * @example
 *
 * var hostapd = require('wireless-tools/hostapd');
 *
 * var options = {
 *   channel: 6,
 *   driver: 'rtl871xdrv',
 *   hw_mode: 'g',
 *   interface: 'wlan0',
 *   ssid: 'RaspberryPi',
 *   wpa: 2,
 *   wpa_passphrase: 'raspberry'
 * };
 *
 * hostapd.enable(options, function(err) {
 *   // the access point was created
 * });
 *
 */
export const enable = (options, callback) => {
  if (callback) {
    var file = options.interface + '-hostapd.conf';

    var commands = [
      'cat <<EOF >' + file + ' && hostapd -B ' + file + ' && rm -f ' + file
    ];

    Object.getOwnPropertyNames(options).forEach(function(key) {
      commands.push(key + '=' + options[key]);
    });

    return exec(commands.join('\n'), callback);
  }
  else {
    return promisify(enable)(options);
  }
}

/**
 * The **hostpad** command is used to configure wireless access points.
 *
 * @static
 * @category hostapd
 *
 */
export const hostapd = {
  disable: disable,
  enable: enable,
};

export default hostapd;