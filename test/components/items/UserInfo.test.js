/**
 * Unit tests with Jest and Enzyme for the UserInfo component.
 * @author Andrew Jarombek
 * @since 4/18/2020
 */

import React from 'react';
import { shallow, mount } from 'enzyme';
import UserInfo from '../../../src/components/items/UserInfo';

describe('unit tests', () => {

  it('renders', () => {
    const wrapper = shallow(<UserInfo/>);
    expect(wrapper.exists()).toBe(true);
  });

});
