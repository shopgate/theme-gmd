/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css } from 'glamor';
import colors from 'Styles/colors';

const disabled = css({
  color: `${colors.shade4}`,
}).toString();

const text = css({
  hyphens: 'auto',
  wordWrap: 'break-word',
}).toString();

export default {
  disabled,
  text,
};