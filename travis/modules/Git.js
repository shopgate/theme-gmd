/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const Cmd = require('./Cmd');

/**
 * Handles git operations.
 */
class Git extends Cmd {
  /**
   * Gets current branch.
   * @returns {number}
   */
  static getBranch() {
    return new Promise((resolve, reject) => {
      this.runCommand('git branch | grep \\*')
        .then((data) => {
          resolve(data.replace('* ', ''));
        })
        .catch(err => reject(err));
    });
  }
}

module.exports = Git;
