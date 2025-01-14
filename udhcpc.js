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
 * The **udhcpc disable** command is used to stop a dhcp client on a
 * specific network interface.
 *
 * @static
 * @category udhcpc
 * @param {string} interfaceName The network interface.
 * @param {function} [callback] The callback function.
 * @returns {process|Promise<void>} The child process.
 * @example
 *
 * var udhcpc = require('wireless-tools/udhcpc');
 *
 * udhcpc.disable('wlan0', function(err) {
 *   // the dhcp client was stopped
 * });
 *
 */
export const disable = (interfaceName, callback) => {
  if (callback) {
    const command = 'kill `pgrep -f "^udhcpc -i ' + interfaceName + '"` || true';
    return exec(command, callback);
  }
  else {
    return promisify(disable)(interfaceName);
  }
}

/**
 * The **udhcpc enable** command is used to start a dhcp client on a
 * specific network interface.
 *
 * @static
 * @category udhcpc
 * @param {object} options The dhcp client configuration.
 * @param {function} [callback] The callback function.
 * @returns {process|Promise<void>} The child process.
 * @example
 *
 * var udhcpc = require('wireless-tools/udhcpc');
 *
 * var options = {
 *   interface: 'wlan0'
 * };
 *
 * udhcpc.enable(options, function(err) {
 *   // the dhcp client was started 
 * });
 *
 */
export const enable = (options, callback) => {
  if (callback) {
    const command = 'udhcpc -i ' + options.interface + ' -n';
    return exec(command, callback);  
  }
  else {
    return promisify(enable)(options);
  }
}

/**
 * The **udhcpc** command is used to configure a dhcp client for a
 * network interface.
 *
 * @static
 * @category udhcpc
 *
 */
export const udhcpc = {
  disable: disable,
  enable: enable
};

export default udhcpc;