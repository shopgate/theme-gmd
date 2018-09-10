import React from 'react';
import PropTypes from 'prop-types';
import { RouteContext } from '@virtuous/react-conductor/Router';
import Link from '@shopgate/pwa-common/components/Link';
import Grid from '@shopgate/pwa-common/components/Grid';
import { CATEGORY_PATH } from '@shopgate/pwa-common-commerce/category/constants';
import { SEARCH_PATH } from '@shopgate/pwa-common-commerce/search/constants';
import Label from './components/Label';
import Chips from './components/Chips';
import CrossButton from './components/CrossButton';
import styles from './style';

/**
 * The Filter List Item component.
 * @param {Object} props The component props.
 * @return {JSX}
 */
const ListItem = ({ filter, id }) => {
  const isActive = !!(filter.active && filter.active.length > 0);

  const link = id ? `${CATEGORY_PATH}/${id}${filter.url}` : `${SEARCH_PATH}${filter.url}`;

  return (
    <div className={styles.item} data-test-id="filterListItem">
      <Link href={link}>
        <Grid>
          <Grid.Item className={styles.gridItem} grow={1} shrink={0}>
            <Label label={filter.label} />
          </Grid.Item>
          {isActive && (
            <Grid.Item grow={1} className={styles.rightContainer}>
              <Chips values={filter.active} />
            </Grid.Item>
          )}
        </Grid>
      </Link>
      {filter.active && <CrossButton filterId={filter.id} />}
    </div>
  );
};

ListItem.propTypes = {
  filter: PropTypes.shape().isRequired,
  id: PropTypes.string,
};

ListItem.defaultProps = {
  id: null,
};

export default props => (
  <RouteContext.Consumer>
    {({ params, query }) => (
      <ListItem {...props} id={params.categoryId || null} search={query.s || null} />
    )}
  </RouteContext.Consumer>
);
