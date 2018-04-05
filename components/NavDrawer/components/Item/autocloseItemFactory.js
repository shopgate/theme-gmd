import React from 'react';
import Item from './index';

/**
 * Factory that creates an Item component which implements default close property.
 * Close property can still be overridden.
 * @param {function} close NavDrawer close function.
 * @returns {function}
 */
const autocloseItemFactory = (close) => (props) => (<Item close={close} {...props} />);

export default autocloseItemFactory;
