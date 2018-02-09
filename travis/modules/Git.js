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
   * Checks if branch which is fetched from git looks correct.
   * @param {string} branchName Branch name from git.
   * @returns {Promise}
   */
  static shouldGetTravisBranch(branchName) {
    return new Promise((resolve, reject) => {
      if (branchName.indexOf('HEAD') === -1) {
        return reject();
      }
      return resolve();
    });
  }

  /**
   * Gets travis specific branch (fetched from ENV).
   * @returns {Promise}
   */
  static getTravisBranch() {
    return this.runCommand('echo $TRAVIS_PULL_REQUEST_BRANCH');
  }
  /**
   * Gets current branch.
   * @returns {number}
   */
  static getBranch() {
    return new Promise((resolve, reject) => {
      let branchFromGit;
      this.runCommand('git branch | grep \\*')
        .then((data) => {
          branchFromGit = data.replace('* ', '');
          return this.shouldGetTravisBranch(branchFromGit);
        })
        .then(() => this.getTravisBranch())
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(branchFromGit);
        });
    });
  }
}

module.exports = Git;
