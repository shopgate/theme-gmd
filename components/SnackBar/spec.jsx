/**
 * Copyright (c) 2018, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import mockRenderOptions from '@shopgate/pwa-common/helpers/mocks/mockRenderOptions';
import Message from './components/Message';
import Container from './components/Container';
import ActionButton from './components/ActionButton';
import { mockedState } from './mock';

const mockedStore = configureStore();

const createComponent = (state) => {
  /* eslint-disable global-require */
  const SnackBar = require('./index').default;
  /* eslint-enable global-require */
  return mount(
    <Provider store={mockedStore(state)}>
      <SnackBar />
    </Provider>,
    mockRenderOptions
  );
};

describe('<SnackBar />', () => {
  it('should render component without action', () => {
    const wrapper = createComponent(mockedState);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Message).exists()).toBe(true);
    expect(wrapper.find(Container).exists()).toBe(true);
  });
  it('shuld render component with action button', () => {
    const wrapper = createComponent({
      toast: [
        {
          ...mockedState.toast[0],
          action: 'click me',
        },
      ],
    });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Message).exists()).toBe(true);
    expect(wrapper.find(Container).exists()).toBe(true);
    expect(wrapper.find(ActionButton).exists()).toBe(true);
  });
});
