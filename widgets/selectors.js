import { createSelector } from 'reselect';
import { SORT_PRICE_ASC, SORT_PRICE_DESC } from '@shopgate/engage/core';
import { generateResultHash } from '@shopgate/pwa-common/helpers/redux';
import { transformDisplayOptions } from '@shopgate/pwa-common/helpers/data';
import { getSortOrder } from '@shopgate/pwa-common/selectors/history';
import {
  getPopulatedProductsResult,
  getProduct,
} from '@shopgate/pwa-common-commerce/product/selectors/product';
import {
  getCategoryChildren,
  getRootCategories,
} from '@shopgate/pwa-common-commerce/category/selectors';
import { getFulfillmentParams } from '@shopgate/pwa-common-commerce/product';
import * as pipelines from '@shopgate/pwa-common-commerce/product/constants/Pipelines';

/**
 * Retrieves the result hash.
 * @param {Object} state The application state.
 * @param {number} type The query type.
 * @param {Object} params The query params.
 * @param {string} params.sort The sort order of the query.
 * @param {string} params.value The query parameters, depends on the query type.
 * @param {string} id A unique id for the component that is using this action.
 * @returns {string} The result hash.
 */
const getResultHash = (state, type, params, id) => {
  let hashParams = {};
  const currentSort = getSortOrder(state);
  const { value, sort = currentSort } = params;
  const transformedSort = transformDisplayOptions(sort);
  const fulfillmentParams = getFulfillmentParams(state);

  // Create the hash parameters based on the query type and parameters.
  switch (type) {
    // Product highlights
    case 1: {
      hashParams = {
        id,
        pipeline: pipelines.SHOPGATE_CATALOG_GET_HIGHLIGHT_PRODUCTS,
        sort: transformedSort,
      };

      break;
    }

    // Search phrase
    case 2:
    case 3: {
      hashParams = {
        id,
        searchPhrase: value,
        sort: transformedSort,
        ...fulfillmentParams,
      };

      break;
    }

    // Product ID's
    case 4: {
      hashParams = {
        id,
        productIds: value,
        sort: transformedSort,
        ...fulfillmentParams,
      };

      break;
    }

    // Category
    case 5: {
      hashParams = {
        id,
        categoryId: value,
        sort: transformedSort,
        ...fulfillmentParams,
      };

      break;
    }
    default:
  }

  // Generate the hash string.
  return generateResultHash(hashParams, true, false);
};

/**
 * Retrieves the result by hash.
 * @param {Object} state The application state.
 * @param {Object} props The component props.
 * @returns {Object} The result.
 */
const getResultByHash = createSelector(
  state => state.product,
  getResultHash,
  (productState, hash) => productState.resultsByHash[hash]
);

/**
 * Retrieves the populated product result.
 * @param {Object} state The application state.
 * @param {Object} params The query parameters.
 * @returns {Object} The product result.
 */
export const getProductsResultWithHash = createSelector(
  state => state,
  (state, props) => props,
  getResultHash,
  getResultByHash,
  getPopulatedProductsResult
);

/**
 * @param {Object} state he application state.
 * @param {int} type Number indicating search type.
 * @param {Object} params Query parameters.
 * @param {string} id Id of component.
 * @return {Object} The product result.
 */
export const getProductsResultsWithIds = (state, type, params, id) => {
  const currentSort = getSortOrder(state);
  const { value: productIds = [], sort = currentSort } = params || {};
  let products = productIds.map(productId => getProduct(state, { productId })).filter(Boolean);
  const hash = getResultHash(state, type, params, id);

  const transformedSort = transformDisplayOptions(sort);

  // Sort by price since fetch by id does not support sorting
  if (transformedSort === SORT_PRICE_ASC) {
    products = products.sort((p1, p2) => p1.price.unitPrice - p2.price.unitPrice);
  }

  if (transformedSort === SORT_PRICE_DESC) {
    products = products.sort((p1, p2) => p2.price.unitPrice - p1.price.unitPrice);
  }
  return {
    products,
    totalProductCount: products.length,
    sort: transformDisplayOptions(sort),
    hash,
  };
};

/**
 * @param {Object} state he application state.
 * @param {int} type Number indicating search type.
 * @param {Object} params Query parameters.
 * @param {string} id Id of component.
 * @return {Object} The product result.
 */
export const getProductsResult = (state, type, params, id) => {
  /**
   * By default the productIds query type bypasses the regular product request logic. It will
   * just request the products that are not available in Redux yet.
   * This can cause update issues in the UI, since selectors might not return fresh data when
   * Redux changes.
   * So when the "useDefaultRequestForProductIds" flag is active, the regular request system is
   * used and whenever the fetch params change, new product data fill be fetched. Additionally
   * the default selector logic needs to be used which selects all data from the regular request.
   */
  if (type === 4 && !params?.useDefaultRequestForProductIds) {
    return getProductsResultsWithIds(state, type, params, id);
  }

  return getProductsResultWithHash(state, type, params, id);
};

/**
 * Retrieves the populated product result.
 * @param {Object} state The application state.
 * @param {Object} params The query parameters.
 * @returns {Object} The product result.
 */
export const getProductsFetchingState = createSelector(
  state => state,
  getResultHash,
  getResultByHash,
  (state, hash, result) => (result ? result.isFetching : null)
);

/**
 * Retrieves categories from the state.
 * If no category id is passed, root-categories will be returned.
 * @param {Object} state The application state.
 * @param {Object} props The component props.
 * @returns {Object[]} The categories collection.
 */
export const getCategoriesById = createSelector(
  getCategoryChildren,
  getRootCategories,
  (state, props) => props.categoryId,
  (childCategories, rootCategories, categoryId) => {
    // Check if we have to handle the root-category
    if (!categoryId && rootCategories) {
      return rootCategories;
    }

    return childCategories;
  }
);
