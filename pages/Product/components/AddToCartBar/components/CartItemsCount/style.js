/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css } from 'glamor';
import variables from 'Styles/variables';

export const duration = 300;

export const transition = {
  entering: {
    transform: 'translate3d(0, 200%, 0)',
  },
  entered: {
    transform: 'translate3d(0, 0, 0)',
  },
  exited: {
    transform: 'translate3d(0, 200%, 0)',
  },
  exiting: {
    transform: 'translate3d(0, 0, 0)',
  },
};

const container = css({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  transition: `transform ${duration}ms cubic-bezier(0.07,0.29,0.31,1.34)`,
  willChange: 'transform',
});

const check = css({
  fontSize: '1.2rem',
  paddingRight: variables.gap.small,
});

export default {
  container,
  check,
};
