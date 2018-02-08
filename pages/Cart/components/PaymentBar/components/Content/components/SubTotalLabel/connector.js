/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { connect } from 'react-redux';
import { CART_PATH } from '@shopgate/pwa-common-commerce/cart/constants';
import { isViewLoading } from '@shopgate/pwa-common/selectors/view';

/**
 * Maps the contents of the state to the component props.
 * @param {Object} state The current application state.
 * @return {Object} The extended component props.
 */
const mapStateToProps = state => ({
  isDisabled: isViewLoading(state, CART_PATH),
});

export default connect(mapStateToProps);
