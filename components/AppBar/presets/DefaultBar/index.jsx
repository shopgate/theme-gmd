import React, { Fragment, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { AppBar, NavDrawer } from '@shopgate/pwa-ui-material';
import { BurgerIcon } from '@shopgate/pwa-ui-shared';
import { Portal } from '@shopgate/pwa-common/components';
import {
  APP_BAR_DEFAULT_BEFORE,
  APP_BAR_DEFAULT,
  APP_BAR_DEFAULT_AFTER,
} from '@shopgate/pwa-common/constants/Portals';
import { withRoute, withWidgetSettings } from '@shopgate/engage/core';
import AppBarIcon from './components/Icon';
import CartButton from './components/CartButton';
import SearchButton from './components/SearchButton';
import ProgressBar from './components/ProgressBar';
import connect from './connector';

/**
 * The AppBarDefault component.
 */
class AppBarDefault extends PureComponent {
  static propTypes = {
    route: PropTypes.shape().isRequired,
    setFocus: PropTypes.bool.isRequired,
    widgetSettings: PropTypes.shape().isRequired,
    below: PropTypes.node,
    title: PropTypes.string,
  };

  static defaultProps = {
    title: null,
    below: null,
  };

  static contextTypes = {
    i18n: PropTypes.func,
  };

  state = {
    target: document.getElementById('AppHeader'),
  }

  /**
   * Sets the target if it hasn't been set before.
   */
  componentDidMount() {
    let { target } = this.state;

    if (!target) {
      target = document.getElementById('AppHeader');
      this.setState({ target: target || null }); // eslint-disable-line react/no-did-mount-set-state
    }

    if (this.props.setFocus) {
      // Set the focus to the first focusable element for screen readers.
      const focusable = target.querySelector('button:not([aria-hidden="true"]), [tabindex]:not([tabindex="-1"])');

      if (focusable) {
        focusable.focus();
      }
    }
  }

  /**
   * @returns {Object}
   */
  get buttonStyle() {
    const { buttonColor } = this.props.widgetSettings;

    return {
      color: buttonColor || 'inherit',
    };
  }

  /**
   * @returns {JSX}
   */
  render() {
    if (!this.props.route.visible || !this.state.target) {
      return null;
    }

    const { __ } = this.context.i18n();
    const title = __(this.props.title || '');

    const { background, color, buttonColor } = this.props.widgetSettings;
    const iconColor = buttonColor || 'inherit';

    const left = <AppBar.Icon color={iconColor} icon={BurgerIcon} onClick={NavDrawer.open} testId="Button" aria-hidden />;
    const center = <AppBar.Title title={title} />;
    const right = (
      <Fragment>
        <SearchButton color={iconColor} />
        <CartButton />
      </Fragment>
    );

    const below = (
      <Fragment>
        {this.props.below}
        <ProgressBar />
      </Fragment>
    );

    return ReactDOM.createPortal(
      <Fragment>
        <Portal name={APP_BAR_DEFAULT_BEFORE} />
        <Portal name={APP_BAR_DEFAULT}>
          <AppBar
            backgroundColor={background}
            textColor={color}
            left={left}
            center={center}
            right={right}
            {...this.props}
            below={below}
          />
        </Portal>
        <Portal name={APP_BAR_DEFAULT_AFTER} />
      </Fragment>,
      this.state.target
    );
  }
}

export const Icon = AppBarIcon;

export default withWidgetSettings(withRoute(connect(AppBarDefault), { prop: 'route' }), '@shopgate/engage/components/AppBar');
