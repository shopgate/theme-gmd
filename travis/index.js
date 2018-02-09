/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const Git = require('./modules/Git');
const TaggedLogger = require('./modules/TaggedLogger');

/**
 * Main function.
 */
function main() {
  const logger = new TaggedLogger('Travis before script');
  logger.log('Start');
  let currentBranch;
  Git.getBranch()
    .then((branch) => {
      currentBranch = branch;
      logger.log(`Current branch is: ${branch}`);
      return Git.cloneDependencies();
    })
    .then(() => {
      logger.log('Dependencies cloned.');
      return Git.checkoutDependencies(currentBranch);
    })
    .then(() => {
      logger.log('Checking out finished.');
    })
    .catch(err => logger.error(err));
}

main();
