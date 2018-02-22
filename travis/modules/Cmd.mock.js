/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Maintains node - cmd line communication.
 */
class CmdOptimistic {
  /**
   * Cmd.get as a promise.
   * @param {string} command Command to be send.
   * @returns {Promise}
   */
  static runCommand(command) {
    return new Promise((resolve) => {
      switch (command) {
        case 'git branch | grep \\*':
          resolve('test-branch');
          break;
        case 'cd ~/travis-tmp-modules/pwa-core && echo $( git branch -r | grep origin/test-branch) 0':
        case 'cd ~/travis-tmp-modules/pwa-common-commerce && echo $( git branch -r | grep origin/test-branch) 0':
          resolve('0');
          break;
        default:
          resolve('');
      }
    });
  }
}

/**
 * Maintains node - cmd line communication.
 * Will return "master" for `git branch` command.
 */
class CmdMasterBranch {
  /**
   * Cmd.get as a promise.
   * @param {string} command Command to be send.
   * @returns {Promise}
   */
  static runCommand(command) {
    return new Promise((resolve) => {
      switch (command) {
        case 'git branch | grep \\*':
          resolve('master');
          break;
        default:
          resolve('');
      }
    });
  }
}
module.exports = {
  CmdOptimistic,
  CmdMasterBranch,
};
