/**
 * Unit tests with Jest and Enzyme for the UserInfo component.
 * @author Andrew Jarombek
 * @since 4/18/2020
 */

import React from 'react';
import { act } from 'react-dom/test-utils'
import { shallow, mount } from 'enzyme';
import UserInfo from '../../../src/components/items/UserInfo';
import * as graphql from '../../../src/datasource/GraphQL';

describe('unit tests', () => {

  it('renders', () => {
    const wrapper = shallow(<UserInfo/>);
    expect(wrapper.exists()).toBe(true);
  });

});

describe('integration tests', () => {

  it('renders', async () => {
    const mock = jest.spyOn(graphql, 'getUserInfo');
    mock.mockReturnValue(new Promise(resolve => ({ data: {} })));
    const wrapper = mount(<UserInfo/>);

    await act(async () => {
      await Promise.resolve(wrapper);
      await new Promise(resolve => setImmediate(resolve));
      wrapper.update();
    });

    console.info(wrapper.debug());
    expect(wrapper.find('.error')).toHaveLength(1);
    expect(wrapper.find('figure')).toHaveLength(0);
  });

});
