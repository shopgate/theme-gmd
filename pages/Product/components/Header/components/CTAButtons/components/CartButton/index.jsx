import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FloatingActionButton } from '@shopgate/pwa-ui-material';
import IndicatorCircle from '@shopgate/pwa-ui-shared/IndicatorCircle';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';
import { broadcastLiveMessage } from '@shopgate/engage/a11y';
import { I18n } from '@shopgate/engage/components';
import { ProductContext } from '@shopgate/engage/product/contexts';
import { DIRECT_SHIP } from '@shopgate/engage/locations';
import Icon from './components/Icon';
import connect from './connector';
import inject from './injector';
import { button, hidden } from './style';

const { colors } = themeConfig;

/**
 * The CartButton component.
 */
class CartButton extends Component {
  static contextType = ProductContext;

  static propTypes = {
    addToCart: PropTypes.func.isRequired,
    conditioner: PropTypes.shape().isRequired,
    disabled: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    options: PropTypes.shape().isRequired,
    productId: PropTypes.string.isRequired,
    isRopeFulfillmentMethodAllowed: PropTypes.bool,
    userLocation: PropTypes.shape(),
    userMethod: PropTypes.string,
  }

  static defaultProps = {
    isRopeFulfillmentMethodAllowed: false,
    userLocation: null,
    userMethod: null,
  }

  state = {
    clicked: false,
  };

  /**
   * Only update when the clicked state has changed.
   * @param {Object} nextProps The next component props.
   * @param {Object} nextState The next component state.
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.clicked !== nextState.clicked ||
      this.props.disabled !== nextProps.disabled ||
      this.props.loading !== nextProps.loading
    );
  }

  /**
   * Returns the color for the button.
   */
  get color() {
    if (this.state.clicked) {
      return `var(--color-button-cta-contrast, ${colors.light})`;
    }

    return (this.props.disabled && !this.props.loading) ? colors.shade5 : `var(--color-button-cta, ${colors.primary})`;
  }

  /**
   * Returns a loading icon or the cart icon.
   */
  get icon() {
    if (this.props.loading) {
      return (
        <IndicatorCircle
          color={`var(--color-button-cta-contrast, ${colors.primaryContrast})`}
          strokeWidth={4}
          paused={false}
        />
      );
    }

    return <Icon
      disabled={this.props.disabled}
      success={this.state.clicked}
      onSuccess={this.resetClicked}
    />;
  }

  /**
   * Handles the button click.
   * Checks if the button can be clicked and if
   * all criteria set by the conditioner are met.
   */
  handleClick = () => {
    const {
      disabled,
      conditioner,
      addToCart,
      productId,
      options,
      userLocation,
      userMethod,
      isRopeFulfillmentMethodAllowed,
    } = this.props;
    if (this.state.clicked) {
      return;
    }

    if (disabled) {
      return;
    }

    conditioner.check().then((fulfilled) => {
      if (!fulfilled) {
        return;
      }

      this.setState({ clicked: true });

      const addToCartData = {
        productId,
        options,
        quantity: this.context.quantity,
      };

      // Add the user location for ROPIS if it is set.
      if (
        userLocation !== null
        && userMethod !== DIRECT_SHIP
        && isRopeFulfillmentMethodAllowed
      ) {
        addToCartData.fulfillment = {
          method: userMethod,
          location: {
            code: userLocation.code,
            name: userLocation.name,
          },
        };
      }

      addToCart(addToCartData);

      broadcastLiveMessage('product.adding_item', {
        params: { count: this.context.quantity },
      });
    });
  }

  /**
   * Reset the state to make the button clickable again.
   */
  resetClicked = () => {
    this.setState({ clicked: false });
  }

  /**
   * @returns {JSX}
   */
  render() {
    return (
      <FloatingActionButton
        background={this.color}
        className={`${button} theme__product__header__cta-buttons__cart-button`}
        onClick={this.handleClick}
        disabled={this.props.disabled}
        testId="addToCartButton"
      >
        <I18n.Text string="product.add_to_cart" className={hidden} />
        {this.icon}
      </FloatingActionButton>
    );
  }
}

export default inject(connect(CartButton));
