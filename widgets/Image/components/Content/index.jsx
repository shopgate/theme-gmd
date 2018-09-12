import React from 'react';
import PropTypes from 'prop-types';
import OptimizedImage from '@shopgate/pwa-ui-shared/OptimizedImage';
import { SourceSetType } from '@shopgate/pwa-ui-shared/Picture';
import styles from '../../style';

/**
 * Image content.
 * @param {Object} props Props
 * @param {Object} props.settings Settings.
 * @returns {JSX}
 */
const Content = ({ settings }) => (
  <OptimizedImage
    src={settings.image}
    sources={settings.optimizedImage}
    alt={settings.alt}
    className={styles.image}
    testId={`imageWidget: ${settings.link}`}
  />
);

Content.propTypes = {
  settings: PropTypes.shape({
    alt: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string,
    optimizedImage: SourceSetType,
  }).isRequired,
};

export default Content;
