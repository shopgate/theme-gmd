/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { SEARCH_PATH } from '@shopgate/pwa-common-commerce/search/constants';
import { CART_PATH } from '@shopgate/pwa-common-commerce/cart/constants';
import { FILTER_PATH } from '@shopgate/pwa-common-commerce/filter/constants';
import {
  routeDidChange$,
  routeDidEnter,
  routeDidLeave,
} from '@shopgate/pwa-common/streams/history';
import { getSearchPhrase } from '@shopgate/pwa-common/selectors/history';
import setSearchSuggestionsPhrase from '@shopgate/pwa-common-commerce/search/action-creators/setSearchSuggestionsPhrase';
import { getSearchSuggestionsPhrase } from '@shopgate/pwa-common-commerce/search/selectors';
import toggleNavSearchField from 'Components/Navigator/actions/toggleNavSearchField';
import enableNavigatorSearch from './actions/enableNavigatorSearch';
import disableNavigatorSearch from './actions/disableNavigatorSearch';
import toggleCartIcon from './actions/toggleCartIcon';

/**
 * Navigator subscriptions.
 * @param {Function} subscribe The subscribe function.
 */
export default function navigator(subscribe) {
  // Derived streams.
  const searchRouteDidEnter$ = routeDidEnter(SEARCH_PATH);
  const cartFilterRoutesDidEnter$ = routeDidEnter(CART_PATH).merge(routeDidEnter(FILTER_PATH));
  const cartFilterRoutesDidLeave$ = routeDidLeave(CART_PATH).merge(routeDidLeave(FILTER_PATH));

  /**
   * Gets triggered on all route changes.
   */
  subscribe(routeDidChange$, ({ dispatch, pathname, prevPathname }) => {
    if (pathname !== prevPathname) {
      dispatch(toggleNavSearchField(false));
    }
  });

  /**
   * Gets triggered on entering the search route.
   */
  subscribe(searchRouteDidEnter$, ({ dispatch, getState }) => {
    const state = getState();

    // If search input is empty, set it to the value of the search query param.
    if (!getSearchSuggestionsPhrase(state)) {
      dispatch(setSearchSuggestionsPhrase(getSearchPhrase(state)));
    }
  });

  /**
   * Gets triggered when leaving the cart or filter route.
   */
  subscribe(cartFilterRoutesDidLeave$, ({ dispatch }) => {
    dispatch(toggleCartIcon(true));
    dispatch(enableNavigatorSearch());
  });

  /**
   * Gets triggered when entering the cart or filter route.
   */
  subscribe(cartFilterRoutesDidEnter$, ({ dispatch }) => {
    dispatch(toggleCartIcon(false));
    dispatch(disableNavigatorSearch());
  });
}
