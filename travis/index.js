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
  Git.getBranch()
    .then((branch) => {
      logger.log(`Current branch is: ${branch}`);
    })
    .catch((err) => {
      logger.error(err);
    });
}

main();
