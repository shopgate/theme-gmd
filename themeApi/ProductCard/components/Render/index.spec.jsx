import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import mockRenderOptions from '@shopgate/pwa-common/helpers/mocks/mockRenderOptions';
import { mockProductId, mockProduct } from '../../mock';
import ProductCardRender from './index';

jest.unmock('@shopgate/pwa-core');

jest.mock('@shopgate/engage/core');
jest.mock('@shopgate/engage/product/hocs', () => ({
  withPriceCalculation: Component => props => <Component {...props} />,
}));
jest.mock('@shopgate/engage/product/components', () => ({
  MapPriceHint: () => null,
  OrderQuantityHint: () => null,
  ProductImage: () => null,
  ProductGridPrice: () => null,
  FeaturedMedia: () => null,
  ProductName: ({ name }) => name,
  ProductDiscountBadge: () => null,
  ProductBadges: ({ children }) => children,
}));
jest.mock('@shopgate/engage/product/hooks', () => ({
  useProductListType: jest.fn(() => ({ meta: null })),
}));
jest.mock('@shopgate/engage/components');
jest.mock('@shopgate/engage/category', () => ({
  PRODUCT_ITEM_PRICE: 'PRODUCT_ITEM_PRICE',
  PRODUCT_ITEM_PRICE_BEFORE: 'PRODUCT_ITEM_PRICE_BEFORE',
  PRODUCT_ITEM_PRICE_AFTER: 'PRODUCT_ITEM_PRICE_AFTER',
}));

const defaultProps = {
  url: '/some/url',
  productId: mockProductId,
  product: mockProduct,
};

/**
 * @param {Object} additionalProps  Additional component props
 * @param {Object} state Redux state.
 * @returns {JSX}
 */
const renderComponent = (additionalProps = {}) => {
  const props = {
    ...defaultProps,
    ...additionalProps,
  };

  const store = configureStore()();
  return mount(
    <Provider store={store}>
      <ProductCardRender {...props} />
    </Provider>,
    mockRenderOptions
  );
};

describe('<ProductCardRender />', () => {
  it('should render as expected', () => {
    const wrapper = renderComponent();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('Portal').length).toBe(6);
    expect(wrapper.find('Link').prop('href')).toEqual(defaultProps.url);
    expect(wrapper.find('ProductCardBadge').exists()).toBe(true);
    expect(wrapper.find('ProductCardBadge').text()).toEqual(`-${mockProduct.price.discount}%`);
    expect(wrapper.find('RatingStars').exists()).toBe(true);
    expect(wrapper.find('RatingStars').prop('value')).toBe(mockProduct.rating.average);
    expect(wrapper.find('ProductCardTitle').exists()).toBe(true);
    expect(wrapper.find('ProductName').prop('name')).toBe(mockProduct.name);
    expect(wrapper.find('ProductName').prop('rows')).toBe(ProductCardRender.defaultProps.titleRows);
    const productCardPrice = wrapper.find('ProductCardPrice');
    expect(productCardPrice.exists()).toBe(true);
    expect(productCardPrice.find('ProductGridPrice').prop('product')).toEqual(mockProduct);
  });

  it('should render without name', () => {
    const wrapper = renderComponent({ hideName: true });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('ProductCardTitle').exists()).toBe(false);
  });

  it('should render without rating', () => {
    const wrapper = renderComponent({ hideRating: true });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('RatingStars').exists()).toBe(false);
  });

  it('should render without prices', () => {
    const wrapper = renderComponent({ hidePrice: true });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('ProductCardBadge').exists()).toBe(false);
    expect(wrapper.find('ProductCardPrice').exists()).toBe(false);
  });

  it('should render with one row for the product name', () => {
    const wrapper = renderComponent({ titleRows: 1 });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('ProductName').prop('rows')).toBe(1);
  });

  it('should not render the discount badge when the is no discount', () => {
    const wrapper = renderComponent({
      product: {
        ...mockProduct,
        price: {
          ...mockProduct.price,
          discount: 0,
        },
      },
    });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('ProductCardBadge').exists()).toBe(false);
  });

  it('should not render the rating stars when there is no average rating', () => {
    const wrapper = renderComponent({
      product: {
        ...mockProduct,
        rating: {
          ...mockProduct.rating,
          average: 0,
        },
      },
    });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('RatingStars').exists()).toBe(false);
  });
});
