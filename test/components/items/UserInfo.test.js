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

  it('renders an error properly', async () => {
    const mock = jest.spyOn(graphql, 'getUserInfo');
    mock.mockReturnValue({ data: { errors: [{ message: "Mock Error" }] } });
    //mock.mockReturnValue({ data: { data: { user: { name: 'Andy'}}} });
    const wrapper = mount(<UserInfo/>);

    await act(async () => {
      await Promise.resolve(wrapper);
      await new Promise(resolve => setImmediate(resolve));
      wrapper.update();
    });

    expect(wrapper.find('.error')).toHaveLength(1);
    expect(wrapper.find('.error').text()).toEqual("Mock Error");

    expect(wrapper.find('figure')).toHaveLength(0);

    mock.mockRestore();
  });

  it('renders data properly', async () => {
    const mock = jest.spyOn(graphql, 'getUserInfo');
    mock.mockReturnValue({
      data: {
        data: {
          user: {
            name: 'Andy',
            location: 'New York, NY',
            websiteUrl: 'jarombek.com'
          }
        }
      }
    });
    const wrapper = mount(<UserInfo/>);

    await act(async () => {
      await Promise.resolve(wrapper);
      await new Promise(resolve => setImmediate(resolve));
      wrapper.update();
    });

    expect(wrapper.find('.error')).toHaveLength(0);

    expect(wrapper.find('figure')).toHaveLength(1);
    expect(wrapper.find('h3').text()).toEqual("Andy");
    expect(wrapper.find('p').text()).toEqual("New York, NY");
    expect(wrapper.find('a').prop('href')).toEqual("https:\\\\jarombek.com");

    mock.mockRestore();
  });

});
