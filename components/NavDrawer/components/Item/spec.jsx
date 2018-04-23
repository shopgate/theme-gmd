import React from 'react';
import { mount } from 'enzyme';
import Item from './index';
import autocloseItemFactory from './autocloseItemFactory';

describe('AutocloseItemFactory', () => {
  it('should create Item component with default close prop', () => {
     const closeFn = () => {};
     const AutocloseItem = autocloseItemFactory(closeFn);
     expect(typeof AutocloseItem === 'function');
     const component = mount(<AutocloseItem />);
     expect(component).toMatchSnapshot();
     expect(component.find('Item').props().close).toBe(closeFn);
     expect(component.find(Item).length).toBe(1);
  });
});