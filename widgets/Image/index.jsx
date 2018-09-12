import React from 'react';
import PropTypes from 'prop-types';
import Link from '@shopgate/pwa-common/components/Router/components/Link';
import { SourceSetType } from '@shopgate/pwa-ui-shared/Picture';
import Content from './components/Content';
import styles from './style';

/**
 * The image widget.
 * @param {Object} props Props of the component
 * @returns {JSX}
 */
const ImageWidget = ({ settings }) => {
  // Wrap a Link around the Image if needed.
  if (settings.link) {
    return (
      <Link href={settings.link} className={styles.link} data-test-id="link">
        <Content settings={settings} />
      </Link>
    );
  }

  return <Content settings={settings} />;
};

ImageWidget.propTypes = {
  settings: PropTypes.shape({
    alt: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string,
    optimizedImage: SourceSetType,
  }).isRequired,
};

export default ImageWidget;
