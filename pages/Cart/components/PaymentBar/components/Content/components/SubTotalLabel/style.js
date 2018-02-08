/**
 * Copyright (c) 2017, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css } from 'glamor';
import colors from 'Styles/colors';

const disabled = css({
  color: `${colors.shade4} !important`,
}).toString();

const totalLabel = css({
  fontSize: '1.125rem',
  fontWeight: 500,
}).toString();

const text = css({
  hyphens: 'auto',
  wordWrap: 'break-word',
}).toString();

export default {
  disabled,
  totalLabel,
  text,
};
