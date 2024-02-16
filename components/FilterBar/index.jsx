import React, {
  useState, useEffect, useMemo, memo,
} from 'react';
import PropTypes from 'prop-types';
import { useWidgetSettings } from '@shopgate/engage/core';
import { ScrollHeader, SurroundPortals } from '@shopgate/engage/components';
import { CATEGORY_ALL_PATTERN } from '@shopgate/engage/category';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';
import Content from './components/Content';
import styles from './style';

const { colors, variables: { scroll: { offset = 100 } = {} } } = themeConfig || {};

/**
 * The FilterBar component.
 * @param {Object} props The component props.
 * @returns {JSX}
 */
function FilterBar({ filters, pattern }) {
  const { hideOnScroll } = useWidgetSettings('@shopgate/engage/components/FilterBar');
  const [active, setActive] = useState(filters !== null && Object.keys(filters).length > 0);

  useEffect(() => {
    setActive(filters !== null && Object.keys(filters).length > 0);
  }, [filters]);

  useEffect(() => {
    if (filters !== null && pattern === CATEGORY_ALL_PATTERN && Object.keys(filters).length === 1) {
      setActive(false);
    }
  }, [filters, pattern]);

  const style = useMemo(() => ({
    background: active ? colors.accent : colors.background,
    color: active ? colors.accentContrast : colors.dark,
  }), [active]);

  return (
    <ScrollHeader hideOnScroll={hideOnScroll} scrollOffset={offset}>
      <div className={`${styles} theme__filter-bar`} data-test-id="filterBar" style={style}>
        <SurroundPortals portalName="filter-bar.content">
          <Content />
        </SurroundPortals>
      </div>
    </ScrollHeader>
  );
}

FilterBar.propTypes = {
  filters: PropTypes.shape(),
  pattern: PropTypes.string,
};

FilterBar.defaultProps = {
  filters: null,
  pattern: '',
};

export default memo(FilterBar);
