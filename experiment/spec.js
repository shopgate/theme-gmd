/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import experiment from '@shopgate/pwa-common/experiment';

describe('Travis experiment', () => {
  it('should return true', () => {
    expect(experiment()).toBe(true);
  });
});
