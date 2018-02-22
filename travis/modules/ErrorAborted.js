/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * This error should be sent when process should be aborted by expected reason.
 */
class ErrorAborted extends Error {}

module.exports = ErrorAborted;
