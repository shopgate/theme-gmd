/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * PWA dependencies names.
 */
const pwaNames = [
  'pwa-core',
  'pwa-common',
  'pwa-common-commerce',
];
/**
 * Dependencies folder name.
 */
const dependenciesFolderName = 'travis-tmp-modules';

/**
 * Gets dependency's folder name.
 * @param {string} name Repository's name.
 * @returns {string}
 */
const getDependencyFolderName = name => `${dependenciesFolderName}/${name}`;

module.exports = {
  dependenciesFolderName,
  getDependencyFolderName,
  pwaNames,
};
