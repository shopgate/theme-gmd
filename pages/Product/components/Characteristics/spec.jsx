import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { productWithVariants } from '@shopgate/pwa-common-commerce/product/mock';
import mockRenderOptions from '@shopgate/pwa-common/helpers/mocks/mockRenderOptions';
// Import from context since it'll be mocked later
import { defaultContext } from './../../context';

const mockedStore = configureStore([thunk]);
jest.resetAllMocks();
jest.mock('./../../context');
jest.mock('@shopgate/pwa-common/components/ProductCharacteristics/context');

describe.skip('<Characteristics>', () => {
  const createComponent = (state) => {
    // eslint-disable-next-line global-require
    const ProductHeader = require('./index').default;
    const store = mockedStore(state);
    return mount(
      <Provider store={store}>
        <ProductHeader productId={defaultContext.productId} />
      </Provider>,
      mockRenderOptions
    );
  };

  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render', () => {
    const { productId } = productWithVariants.product.currentProduct;
    defaultContext.productId = productId;
    const cmp = createComponent(productWithVariants);

    expect(cmp).toMatchSnapshot();
  });
});
