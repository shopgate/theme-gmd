import { connect } from 'react-redux';
import { getProductManufacturer } from '@shopgate/pwa-common-commerce/product/selectors/product';

/**
 * @param {Object} state The current application state.
 * @param {Object} props The component props.
 * @return {Object} The extended component props.
 */
const mapStateToProps = (state, props) => ({
  manufacturer: getProductManufacturer(state, props),
});

/**
 * @param {Object} next The next component props.
 * @param {Object} prev The previous component props.
 * @return {boolean}
 */
const areStatePropsEqual = (next, prev) => {
  if (!prev.manufacturer && next.manufacturer) {
    return false;
  }

  return false;
};

export default connect(mapStateToProps, null, null, { areStatePropsEqual });
