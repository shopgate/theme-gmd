import React, { memo } from 'react';
import { CART_MAX_ITEMS } from '@shopgate/engage/cart';
import connect from './connector';
import styles from './style';

/**
 * @param {Object} props The component props.
 * @param {number} props.count The number of product in the cart.
 * @returns {JSX}
 */
const CartButtonBadge = ({ count }) => (
  (count > 0) && (
    <span className={`${styles} theme__navdrawer__cart-button-badge theme__badge`} test-id="cartButtonBadge">
      {Math.min(count, CART_MAX_ITEMS)}
      {count > 99 && '+'}
    </span>
  )
);

export default connect(memo(CartButtonBadge));
