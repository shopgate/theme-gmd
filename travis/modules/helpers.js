/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const ErrorAborted = require('./ErrorAborted');

/**
 * Checks is branch should be linked.
 * @param {string} name - Branch name.
 * @returns {Promise}
 */
const shouldBranchBeLinked = name => (
  new Promise((resolve, reject) => {
    if (name === 'master') {
      return reject(new ErrorAborted('Master should not be linked'));
    }
    return resolve();
  })
);

/**
 * Sanitizes checkout result and decides if to continue.
 * @param {Array} checkoutResults Result from checkout.
 * @returns {Promise}
 */
const getCheckedOutRepos = checkoutResults => (
  new Promise((resolve, reject) => {
    const checkedOutBranches = checkoutResults.filter(res => !res.aborted).map(res => res.repoName);
    if (checkedOutBranches.length === 0) {
      return reject(new ErrorAborted('All dependencies have no feature branch. No need to link.'));
    }
    return resolve(checkedOutBranches);
  })
);

module.exports = {
  getCheckedOutRepos,
  shouldBranchBeLinked,
};
