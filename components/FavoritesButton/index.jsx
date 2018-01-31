/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeartIcon from 'Components/icons/HeartIcon';
import HeartOutlineIcon from 'Components/icons/HeartOutlineIcon';
import Ripple from 'Components/Ripple';
import styles from './style';
import connect from './connector';

/**
 * The favorites button component.
 */
class FavoritesButton extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    addFavorites: PropTypes.func,
    className: PropTypes.string,
    onRemove: PropTypes.func,
    productId: PropTypes.string,
    removeFavorites: PropTypes.func,
    removeThrottle: PropTypes.number,
    rippleClassName: PropTypes.string,
  };

  static defaultProps = {
    addFavorites: () => {},
    className: '',
    onRemove: () => {},
    productId: null,
    removeFavorites: () => {},
    removeTimeout: null,
    rippleClassName: '',
  };

  constructor(props){
    super(props);
    this.state = {
      active: props.active
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      active: nextProps.active
    });
  }

  /**
   * Adds or removes a given product ID from the favorite list.
   * @param {Object} event The click event object.
   */
  handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!this.props.productId) {
      return;
    }

    if (!this.state.active) {
      this.props.addFavorites(this.props.productId);
    } else {
      if (this.props.removeThrottle) {
        setTimeout(()=> {
          this.props.removeFavorites(this.props.productId);
        }, this.props.removeThrottle);
      } else {
        this.props.removeFavorites(this.props.productId);
      }
      this.props.onRemove();
    }

    this.setState({
      active: !this.state.active
    });
  };

  /**
   * Renders the heart icon as filled or outlined, depending on the favorite list state.
   * @returns {JSX}
   */
  renderIcon() {
    if (this.state.active) {
      return <HeartIcon />;
    }

    return <HeartOutlineIcon />;
  }

  /**
   * Renders the component.
   * @returns {JSX}
   */
  render() {
    return (
      <button className={`${styles.button} ${this.props.className}`} onClick={this.handleClick}>
        <Ripple className={`${styles.ripple} ${this.props.rippleClassName}`}>
          {this.renderIcon()}
        </Ripple>
      </button>
    );
  }
}

export default connect(FavoritesButton);
