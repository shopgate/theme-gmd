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
  dependenciesFolderName,
  getDependencyFolderName,
  pwaNames,
} = require('./constants');

const logger = new TaggedLogger('Travis before - GIT');
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
          branchFromGit = data.replace('* ', '').trim();
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

  /**
   * Creates folder for dependencies.
   * @returns {Promise}
   */
  static prepareDependenciesFolder() {
    return this.runCommand(`mkdir ${dependenciesFolderName}`);
  }

  /**
   * Clones dependency.
   * @param {string} name Shopgate's github repository name.
   * @returns {Promise}
   */
  static cloneDependency(name) {
    return new Promise((resolve, reject) => {
      const githubUrl = `https://github.com/shopgate/${name}.git`;
      const folderName = getDependencyFolderName(name);
      // Git clone pipes to stdErr, -q to avoid it.
      const cmd = `mkdir ${folderName} && git clone -q ${githubUrl} ${folderName}/`;
      this.runCommand(cmd)
        .then(() => {
          logger.log(`${name} cloned`);
          resolve();
        })
        .catch(err => reject(err));
    });
  }
  /**
   * Clones pwa dependencies.
   * @returns {Promise}
   */
  static cloneDependencies() {
    return new Promise((resolve, reject) => {
      this.prepareDependenciesFolder()
        .then(() => Promise.each(pwaNames, name => this.cloneDependency(name)))
        .then(() => resolve())
        .catch(err => reject(err));
    });
  }

  /**
   * Checks out dependency's branch if available.
   * @param {string} repoName Repository's name.
   * @param {string} branchName Target branch name.
   * @returns {Promise}
   */
  static checkoutDependency(repoName, branchName) {
    return new Promise((resolve, reject) => {
      const folderName = getDependencyFolderName(repoName);
      this.runCommand(`cd ${folderName} && echo $( git branch -r | grep origin/${branchName}) 0`)
        .then((data) => {
          if (data.trim() === '0') {
            logger.log(`${repoName} has no "${branchName}" branch.`);
            return new Promise(res => res());
          }
          logger.log(`Checking out ${repoName}/${branchName}`);
          return this.runCommand(`cd ${folderName} && git checkout -q ${branchName}`);
        })
        .then(() => resolve())
        .catch(err => reject(err));
    });
  }

  /**
   * Checks out all Shopgate's PWA dependencies.
   * @param {string} branchName Target branch name.
   * @returns {Promise}
   */
  static checkoutDependencies(branchName) {
    return Promise.each(pwaNames, name => this.checkoutDependency(name, branchName));
  }
}

module.exports = Git;
