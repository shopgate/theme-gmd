/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const Git = require('./modules/Git');
const Npm = require('./modules/Npm');
const TaggedLogger = require('./modules/TaggedLogger');
const ErrorAborted = require('./modules/ErrorAborted');

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

/**
 * Main function.
 */
function main() {
  const logger = new TaggedLogger('Travis before script');
  logger.log('Start');
  let currentBranch;
  let checkedOutRepos;
  Git.getBranch()
    .then((branch) => {
      currentBranch = branch;
      logger.log(`Current branch is: ${branch}`);
      return shouldBranchBeLinked(branch);
    })
    .then(() => Git.cloneDependencies())
    .then(() => {
      logger.log('Dependencies cloned.');
      return Git.checkoutDependencies(currentBranch);
    })
    .then(checkoutResuts => getCheckedOutRepos(checkoutResuts))
    .then((repos) => {
      checkedOutRepos = repos;
      logger.log('Fixing npm known issues when dependencies are linked.');
      return Npm.fixKnownIssuesWhenLinked();
    })
    .then(() => {
      logger.log('Checking out finished.');
      return Npm.linkDependencies(checkedOutRepos);
    })
    .then(() => {
      logger.log('Dependencies linked. Good bye.');
    })
    .catch((err) => {
      if (err instanceof ErrorAborted) {
        logger.log('Aborting operation.', err.message);
        return;
      }
      logger.error('Error occured.', err);
    });
}

main();
