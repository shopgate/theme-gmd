/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Logs things to console using DebugConsole.
 * Decorates messages for each .info|.error call.
 * Use it as DebugConsole, currently only with
 * .info and .error
 */
class TaggedLogger {
  /**
   * Constructs
   * @param {string} name - Tag for logger
   * @param {string} style - Style for tag
   */
  constructor(name) {
    this.name = name;
    this.logger = console;
  }
  /**
   * Logs "log"
   * @param {...*} atts console.log attributes
   */
  log(...atts) {
    this.sendLog('log', [...atts]);
  }

  /**
   * Logs error
   * @param {...*} atts console.error attributes
   */
  error(...atts) {
    this.sendLog('error', [...atts]);
  }

  /**
   * Logs error
   * @param {...*} atts console.error attributes
   */
  warn(...atts) {
    this.sendLog('warn', [...atts]);
  }

  /**
   * Sends log
   * @param {string} level level
   * @param {Array} atts atts
   */
  sendLog(level, atts) {
    let attributes = atts;
    const tag = `[${this.name}] ${attributes[0]}`;
    attributes = attributes.slice(1);

    this.logger[level](tag, ...attributes);
  }
}

module.exports = TaggedLogger;
