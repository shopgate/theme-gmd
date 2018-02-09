/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import CheckIcon from 'Components/icons/CheckIcon';
import Count from './components/Count';
import connect from './connector';
import styles, { duration, durationShort, transition } from './style';

/**
 * The cart items count component.
 * @extends Component
 */
class CartItemsCount extends Component {
  static propTypes = {
    cartProductCount: PropTypes.number.isRequired,
  };

  /**
   * Constructor.
   * @param {Object} props The component props.
   */
  constructor(props) {
    super(props);

    this.state = {
      numItems: props.cartProductCount,
      isVisible: !!props.cartProductCount,
    };
  }

  /**
   * Decides on how to animate when the component props change.
   * @param {Object} nextProps Incoming component props.
   */
  componentWillReceiveProps(nextProps) {
    const numItems = nextProps.cartProductCount;

    if (numItems === 0) {
      // When there are no items, reset this element to hide.
      this.setState({
        isVisible: false,
        numItems,
      });
    } else if (!this.state.isVisible && numItems > 0) {
      // Set to visible when is currently invisible and has items.
      this.setState({
        isVisible: true,
        numItems,
      });
    } else if (this.state.numItems !== numItems) {
      // Just update the value if the number of items changed.
      this.setState({
        numItems,
      });
    }
  }

  /**
   * Only update if the cart product count changed.
   * @param {Object} nextProps The next props.
   * @param {Object} nextState The next state.
   * @return {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.isVisible !== nextState.isVisible
      || this.state.numItems !== nextState.numItems
    );
  }

  /**
   * Renders the component
   * @return {[type]} [description]
   */
  render() {
    return (
      <Transition
        in={this.state.isVisible}
        timeout={{
          enter: duration,
          exit: durationShort,
        }}
      >
        {state => (
          <div className={styles.container} style={transition[state]}>
            <div className={styles.check}>
              <CheckIcon />
            </div>
            <Count count={this.state.numItems} />
          </div>
        )}
      </Transition>
    );
  }
}

export default connect(CartItemsCount);
