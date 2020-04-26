/**
 * Unit tests with Jest and Enzyme for the RepositoryCount component.
 * @author Andrew Jarombek
 * @since 4/25/2020
 */

import React from 'react';
import { mount } from 'enzyme';
import RepositoryCount from '../../../src/components/items/RepositoryCount';
import * as graphql from '../../../src/datasource/GraphQL';
import { act } from 'react-dom/test-utils';

describe('integration tests', () => {

  it('renders an error properly', async () => {
    const mock = jest.spyOn(graphql, 'getPersonalRepositories');
    mock.mockReturnValue({ data: { errors: [{ message: "Mock Error" }] } });
    const wrapper = mount(<RepositoryCount/>);

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
    const mock = jest.spyOn(graphql, 'getPersonalRepositories');

    mock.mockReturnValue({
      data: {
        data: {
          user: {
            repositories: {
              totalCount: 31
            }
          }
        }
      }
    });
    const wrapper = mount(<RepositoryCount/>);

    await act(async () => {
      await Promise.resolve(wrapper);
      await new Promise(resolve => setImmediate(resolve));
      wrapper.update();
    });

    expect(wrapper.find('.error')).toHaveLength(0);

    expect(wrapper.find('h2').text()).toEqual("31");

    mock.mockRestore();
  });
});
