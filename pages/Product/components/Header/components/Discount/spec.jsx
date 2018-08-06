import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import mockRenderOptions from '@shopgate/pwa-common/helpers/mocks/mockRenderOptions';
import { basicProductState } from '@shopgate/pwa-common-commerce/product/mock';

const mockedStore = configureStore();

describe('<Discount>', () => {
// eslint-disable-next-line require-jsdoc
  const createComponent = (state, id) => {
    const store = mockedStore(state);
    // eslint-disable-next-line global-require
    const Discount = require('./index').default;
    return mount(
      <Provider store={store}>
        <Discount productId={id} />
      </Provider>,
      mockRenderOptions
    );
  };

  beforeEach(() => {
    jest.resetModules();
  });

  it('should render empty', () => {
    const { productId } = basicProductState.product.currentProduct;

    const cmp = createComponent(basicProductState, productId);

    expect(cmp).toMatchSnapshot();
    expect(cmp.find('Discount').children().length).toEqual(0);
  });

  it('should render discount', () => {
    const { productId } = basicProductState.product.currentProduct;
    const discount = 10;
    const state = {
      ...basicProductState,
      product: {
        ...basicProductState.product,
        productsById: {
          ...basicProductState.product.productsById,
          [productId]: {
            ...basicProductState.product.productsById[productId],
            productData: {
              ...basicProductState.product.productsById[productId].productData,
              price: {
                ...basicProductState.product.productsById[productId].productData.price,
                discount,
              },
            },
          },
        },
      },
    };

    const cmp = createComponent(state, productId);
    expect(cmp).toMatchSnapshot();

    expect(cmp.find('PlaceholderLabel').length).toEqual(1);
    expect(cmp.find('DiscountBadge').length).toEqual(1);
    expect(cmp.text()).toEqual(`-${discount}%`);
  });
});
