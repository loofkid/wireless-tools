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
 * Parses the status for a wpa network interface.
 *
 * @private
 * @static
 * @category wpa_cli
 * @param {string} block The section of stdout for the interface.
 * @returns {object} The parsed wpa status.
 *
 */
const parse_status_block = (block) => {
    var match;

    var parsed = {};
    if ((match = block.match(/bssid=([A-Fa-f0-9:]{17})/))) {
        parsed.bssid = match[1].toLowerCase();
    }

    if ((match = block.match(/freq=([0-9]+)/))) {
        parsed.frequency = parseInt(match[1], 10);
    }

    if ((match = block.match(/mode=([^\s]+)/))) {
        parsed.mode = match[1];
    }

    if ((match = block.match(/key_mgmt=([^\s]+)/))) {
        parsed.key_mgmt = match[1].toLowerCase();
    }

    if ((match = block.match(/[^b]ssid=([^\n]+)/))) {
        parsed.ssid = match[1];
    }

    if ((match = block.match(/[^b]pairwise_cipher=([^\n]+)/))) {
        parsed.pairwise_cipher = match[1];
    }

    if ((match = block.match(/[^b]group_cipher=([^\n]+)/))) {
        parsed.group_cipher = match[1];
    }

    if ((match =  block.match(/p2p_device_address=([A-Fa-f0-9:]{17})/))) {
        parsed.p2p_device_address = match[1];
    }

    if ((match = block.match(/wpa_state=([^\s]+)/))) {
        parsed.wpa_state = match[1];
    }

    if ((match = block.match(/ip_address=([^\n]+)/))) {
        parsed.ip = match[1];
    }

    if ((match = block.match(/[^_]address=([A-Fa-f0-9:]{17})/))) {
        parsed.mac = match[1].toLowerCase();
    }

    if ((match = block.match(/uuid=([^\n]+)/))) {
        parsed.uuid = match[1];
    }

    if ((match = block.match(/[^s]id=([0-9]+)/))) {
        parsed.id = parseInt(match[1], 10);
    }

    return parsed;
}

/**
 * Parses the result for a wpa command over an interface.
 *
 * @private
 * @static
 * @category wpa_cli
 * @param {string} block The section of stdout for the command.
 * @returns {object} The parsed wpa command result.
 *
 */
const parse_command_block = (block) => {
    var match;

    var parsed = {
        result: block.match(/^([^\s]+)/)[1]
    };

    return parsed;
}

/**
 * Parses the status for a wpa wireless network interface.
 *
 * @private
 * @static
 * @category wpa_cli
 * @param {function} callback The callback function.
 *
 */
const parse_status_interface = (callback) => {
    return function(error, stdout, stderr) {
        if (error) {
            callback(error);
        } else {
            callback(error, parse_status_block(stdout.trim()));
        }
    };
}

/**
 * Parses the result for a wpa command over an interface.
 *
 * @private
 * @static
 * @category wpa_cli
 * @param {function} callback The callback function.
 *
 */
const parse_command_interface = (callback) => {
    return function(error, stdout, stderr) {
        if (error) {
            callback(error);
        } else {
            var output = parse_command_block(stdout.trim());
            if (output.result === 'FAIL') {
                callback(new Error(output.result));
            } else {
                callback(error, parse_command_block(stdout.trim()));
            }
        }
    };
}

/**
 * Parses the results of a scan_result request.
 *
 * @private
 * @static
 * @category wpa_cli
 * @param {string} block The section of stdout for the interface.
 * @returns {object} The parsed scan results.
 */
const parse_scan_results = (block) => {
    var match;
    var results = [];
    var lines;
    
    lines = block.split('\n').map(function(item) { return item + "\n"; });
    lines.forEach(function(entry){
        var parsed = {};
        if ((match = entry.match(/([A-Fa-f0-9:]{17})\t/))) {
            parsed.bssid = match[1].toLowerCase();
        }

        if ((match = entry.match(/\t([\d]+)\t+/))) {
            parsed.frequency = parseInt(match[1], 10);
        }

        if ((match = entry.match(/([-][0-9]+)\t/))) {
            parsed.signalLevel = parseInt(match[1], 10);
        }

        if ((match = entry.match(/\t(\[.+\])\t/))) {
            parsed.flags = match[1];
        }

        if ((match = entry.match(/\t([^\t]{1,32}(?=\n))/))) {
            parsed.ssid = match[1];
        }

        if(!(Object.keys(parsed).length === 0 && parsed.constructor === Object)){
            results.push(parsed);
        }
    });

    return results;
}

/**
 * Parses the status for a scan_results request.
 *
 * @private
 * @static
 * @category wpa_cli
 * @param {function} callback The callback function.
 *
 */
const parse_scan_results_interface = (callback) => {
    return function(error, stdout, stderr) {
        if (error) {
            callback(error);
        } else {
            callback(error, parse_scan_results(stdout.trim()));
        }
    };
}

/**
 * Parses the networks for a list_networks request.
 *
 * @private
 * @static
 * @category wpa_cli
 * @param {function} callback The callback function.
 *
 */
const parse_list_networks_block = (callback) => {
    return (error, stdout, stderr) => {
        if (error) callback(error);
        else callback(error, parse_list_networks_result(stdout.trim()));
    }
}

/**
 * Parses the results of a list_networks request.
 *
 * @private
 * @static
 * @category wpa_cli
 * @param {string} block The section of stdout for the interface.
 * @returns {object[]} The parsed list_networks results.
 */
const parse_list_networks_result = (block) => {
    const networksList = block.split("\n");
    let networksArray = [];
    networksList.splice(0, 1); //Remove headers
    // networksList.splice(networksList.length - 1, 1); //Remove footer

    for (const networkIndex in networksList) {
        let tempNetworkJson = {};

        const parameters = networksList[networkIndex].split("\t");
        tempNetworkJson = {
            network_id: parameters[0],
            ssid: parameters[1],
            bssid: parameters[2],
            flags: parameters[3]
        };
        networksArray.push(tempNetworkJson);
    }
    return networksArray;
}


/**
 * Parses the status for wpa network interface.
 *
 * @private
 * @static
 * @category wpa
 * @param {string} interfaceName The wireless network interface.
 * @param {function} [callback] The callback function.
 * @example
 *
 * var wpa_cli = require('wireless-tools/wpa_cli');
 *
 * wpa_cli.status('wlan0', function(err, status) {
 *     console.dir(status);
 *     wpa_cli.bssid('wlan0', '2c:f5:d3:02:ea:dd', 'Fake-Wifi', function(err, data){
 *         console.dir(data);
 *         wpa_cli.bssid('wlan0', 'Fake-Wifi', '2c:f5:d3:02:ea:dd', function(err, data){
 *             if (err) {
 *                 console.dir(err);
 *                 wpa_cli.reassociate('wlan0', function(err, data) {
 *                     console.dir(data);
 *                 });
 *              }
 *          });
 *     });
 * });
 *
 *
 *
 * // =>
 * {
 *     bssid: '2c:f5:d3:02:ea:d9',
 *     frequency: 2412,
 *     mode: 'station',
 *     key_mgmt: 'wpa2-psk',
 *     ssid: 'Fake-Wifi',
 *     pairwise_cipher: 'CCMP',
 *     group_cipher: 'CCMP',
 *     p2p_device_address: 'e4:28:9c:a8:53:72',
 *     wpa_state: 'COMPLETED',
 *     ip: '10.34.141.168',
 *     mac: 'e4:28:9c:a8:53:72',
 *     uuid: 'e1cda789-8c88-53e8-ffff-31c304580c1e',
 *     id: 0
 * }
 *
 * OK
 *
 * FAIL
 *
 * OK
 *
 */
export const status = (interfaceName, callback) => {
    if (callback) {
        const command = [ 'wpa_cli -i', interfaceName, 'status'].join(' ');
        return exec(command, parse_status_interface(callback));
    }
    else {
        return promisify(status)(interfaceName);
    }
}

export const bssid = (interfaceName, ap, ssid, callback) => {
    if (callback) {
        const command = ['wpa_cli -i', interfaceName, 'bssid', ssid, ap].join(' ');
        return exec(command, parse_command_interface(callback));
    }
    else {
        return promisify(bssid)(interfaceName, ap, ssid);
    }
}

export const reassociate = (interfaceName, callback) => {
    if (callback) {
        const command = ['wpa_cli -i',
            interfaceName,
            'reassociate'].join(' ');

        return exec(command, parse_command_interface(callback));
    }
    else {
        return promisify(reassociate)(interfaceName);
    }
}

/* others commands not tested
    //ap_scan 1
    // set_network 0 0 scan_ssid 1


    // set: set,
    // add_network: add_network,
    // set_network: set_network,
    // enable_network: enable_network
*/

export const set = (interfaceName, variable, value, callback) => {
    if (callback) {
        const command = ['wpa_cli -i',
            interfaceName,
            'set',
            variable,
            value ].join(' ');

        return exec(command, parse_command_interface(callback));
    }
    else {
        return promisify(set)(interfaceName, variable, value);
    }
}


export const list_networks = (interfaceName, callback) => {
    if (callback) {
        const command = ['wpa_cli -i', interfaceName, 'list_networks'].join(' ');

        return exec(command, parse_list_networks_block(callback));
    }
    else {
        return promisify(list_networks)(interfaceName);
    }
}

export const add_network = (interfaceName, callback) => {
    if (callback) {
        const command = ['wpa_cli -i',
                    interfaceName,
                    'add_network' ].join(' ');

        return exec(command, parse_command_interface(callback));
    }
    else {
        return promisify(add_network)(interfaceName);
    }
}

export const set_network = (interfaceName, id, variable, value, callback) => {
    if (callback) {
        const command = ['wpa_cli -i',
                    interfaceName,
                    'set_network',
                    id,
                    variable,
                    value ].join(' ');

        return exec(command, parse_command_interface(callback));
    }
    else {
        return promisify(set_network)(interfaceName, id, variable, value);
    }
}

export const enable_network = (interfaceName, id, callback) => {
    if (callback) {
        const command = ['wpa_cli -i',
                    interfaceName,
                    'enable_network',
                    id ].join(' ');

        return exec(command, parse_command_interface(callback));
    }
    else {
        return promisify(enable_network)(interfaceName, id);
    }
}

export const disable_network = (interfaceName, id, callback) => {
    if (callback) {
        const command = ['wpa_cli -i',
                    interfaceName,
                    'disable_network',
                    id ].join(' ');

        return exec(command, parse_command_interface(callback));
    }
    else {
        return promisify(disable_network)(interfaceName, id);
    }
}

export const remove_network = (interfaceName, id, callback) => {
    if (callback) {
        const command = ['wpa_cli -i',
                    interfaceName,
                    'remove_network',
                    id ].join(' ');

        return exec(command, parse_command_interface(callback));
    }
    else {
        return promisify(remove_network)(interfaceName, id);
    }
}

export const select_network = (interfaceName, id, callback) => {
    if (callback) {
        const command = ['wpa_cli -i',
            interfaceName,
            'select_network',
            id ].join(' ');

        return exec(command, parse_command_interface(callback));
    }
    else {
        return promisify(select_network)(interfaceName, id);
    }
}

export const scan = (interfaceName, callback) => {
    if (callback) {
        const command = ['wpa_cli -i',
            interfaceName,
            'scan'].join(' ');

        return exec(command, parse_command_interface(callback));
    }
    else {
        return promisify(scan)(interfaceName);
    }
}

export const scan_results = (interfaceName, callback) => {
    if (callback) {
        const command = ['wpa_cli -i',
            interfaceName,
            'scan_results'].join(' ');

        return exec(command, parse_scan_results_interface(callback));
    }
    else {
        return promisify(scan_results)(interfaceName);
    }
}

export const save_config = (interfaceName, callback) => {
    if (callback) {
        const command = ['wpa_cli -i',
            interfaceName,
            'save_config'].join(' ');

        return exec(command, parse_command_interface(callback));
    }
    else {
        return promisify(save_config)(interfaceName);
    }
}

/**
 * The **wpa_cli** command is used to configure wpa network interfaces.
 *
 * @private
 * @category wpa_cli
 *
 */
export const wpa_cli = {
    status: status,
    bssid: bssid,
    reassociate: reassociate,
    set: set,
    list_networks: list_networks,
    add_network: add_network,
    set_network: set_network,
    enable_network: enable_network,
    disable_network: disable_network,
    remove_network: remove_network,
    select_network: select_network,
    scan: scan,
    scan_results: scan_results,
    save_config: save_config
};

export default wpa_cli;