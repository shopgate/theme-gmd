/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  mockedStateWithoutReview,
} from 'Components/Reviews/mock';

export const mockedState = {
  ...mockedStateWithoutReview,
  reviews: {
    reviewsByHash: {},
  },
  history: {
    state: {
      title: '',
      viewTop: true,
    },
  },
};
