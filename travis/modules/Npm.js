/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
const Promise = require('bluebird');
const Cmd = require('./Cmd');
const TaggedLogger = require('./TaggedLogger');
const {
  getDependencyFolderName,
  pwaNames,
} = require('./constants');

const logger = new TaggedLogger('Travis before - NPM');
/**
 * Handles npm operations.
 */
class Npm extends Cmd {
  /**
   * Links dependency.
   * @param {string} name Dependency name.
   * @returns {Promise}
   */
  static createLink(name) {
    return new Promise((resolve, reject) => {
      this.runCommand(`cd ${getDependencyFolderName(name)} && npm link -q`)
        .then(() => {
          logger.log(`Registered link for ${name}`);
          resolve();
        })
        .catch(err => reject(err));
    });
  }

  /**
   * Npm link.
   * @param {string} name Dependency name.
   * @returns {Promise}
   */
  static initLink(name) {
    return new Promise((resolve, reject) => {
      this.runCommand(`cd .. && npm link @shopgate/${name}`)
        .then(() => {
          logger.log(`Module ${name} linked.`);
          resolve();
        })
        .catch(err => reject(err));
    });
  }

  /**
   * Links all dependencies.
   * @returns {Promise}
   */
  static linkDependencies() {
    return new Promise((resolve, reject) => {
      logger.log('Linking dependencies');
      Promise.each(pwaNames, name => this.createLink(name))
        .then(() => Promise.each(pwaNames, name => this.initLink(name)))
        .then(() => resolve())
        .catch(err => reject(err));
    });
  }
}

module.exports = Npm;
