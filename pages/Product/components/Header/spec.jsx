import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import mockRenderOptions from '@shopgate/pwa-common/helpers/mocks/mockRenderOptions';
import { basicProductState } from './../mock';

const mockedStore = configureStore([thunk]);
jest.resetAllMocks();
jest.mock('Components/Reviews/components/Header', () => function () {
  return (<div />);
});
jest.mock('./../../context');

describe('<ProductHeader>', () => {
  // eslint-disable-next-line require-jsdoc
  const createComponent = (state, props) => {
    // eslint-disable-next-line global-require
    const ProductHeader = require('./index').default;
    const store = mockedStore(state);
    return mount(
      <Provider store={store}>
        <ProductHeader {...props} />
      </Provider>,
      mockRenderOptions
    );
  };

  const components = [
    'CTAButtons',
    'Manufacturer',
    'Availability',
    'Rating',
    'Name',
    'Price',
    'PriceStriked',
    'Shipping',
    'Tiers',
  ];

  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render', () => {
    // eslint-disable-next-line global-require
    const { defaultContext } = require('./../../context');
    const { productId } = basicProductState.product.currentProduct;
    defaultContext.productId = productId;

    const cmp = createComponent(basicProductState, { productId });
    expect(cmp).toMatchSnapshot();
    components.forEach((c) => {
      expect(cmp.find(c).exists()).toBe(true);
    });
  });
});
