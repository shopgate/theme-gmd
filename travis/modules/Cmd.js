/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const cmd = require('node-cmd');

/**
 * Maintains node - cmd line communication.
 */
class Cmd {
  /**
   * Cmd.get as a promise.
   * @param {string} command Command to be send.
   * @returns {Promise}
   */
  static runCommand(command) {
    return new Promise((resolve, reject) => {
      cmd.get(command, (err, data, stdErr) => {
        if (err || stdErr) {
          return reject(err || stdErr);
        }
        return resolve(data);
      });
    });
  }
}

module.exports = Cmd;
