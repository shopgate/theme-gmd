import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SurroundPortals, View } from '@shopgate/engage/components';
import { CATEGORY_LIST } from '@shopgate/engage/category/constants';
import { CategoryList } from '@shopgate/engage/category/components';
import { DefaultBar } from 'Components/AppBar/presets';
import connect from './connector';

/**
 * The RootCategory component.
 */
class RootCategory extends PureComponent {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape()),
  };

  static defaultProps = {
    categories: null,
  };

  /**
   * @returns {JSX.Element}
   */
  render() {
    const { categories } = this.props;
    return (
      <View>
        <DefaultBar title="titles.categories" />
        <SurroundPortals portalName={CATEGORY_LIST} portalProps={{ categories }}>
          <CategoryList categories={categories} prerender={8} />
        </SurroundPortals>
      </View>
    );
  }
}

export default connect(RootCategory);
