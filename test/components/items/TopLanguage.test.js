/**
 * Unit tests with Jest and Enzyme for the TopLanguage component.
 * @author Andrew Jarombek
 * @since 4/25/2020
 */

import React from 'react';
import { mount } from 'enzyme';
import TopLanguage from '../../../src/components/items/TopLanguage';
import * as graphql from '../../../src/datasource/GraphQL';
import { act } from 'react-dom/test-utils';

describe('integration tests', () => {

  it('renders an error properly', async () => {
    const mock = jest.spyOn(graphql, 'getTopLanguage');
    mock.mockReturnValue({ data: { errors: [{ message: "Mock Error" }] } });
    const wrapper = mount(<TopLanguage/>);

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
    const mock = jest.spyOn(graphql, 'getTopLanguage');

    const createRepoObject = (name) => ({
      node: {
        primaryLanguage: {
          name
        }
      }
    });

    mock.mockReturnValue({
      data: {
        data: {
          user: {
            repositories: {
              edges: [
                createRepoObject("Java"),
                createRepoObject("JavaScript"),
                createRepoObject("JavaScript"),
                createRepoObject("Python"),
                createRepoObject("HCL"),
                createRepoObject("Groovy"),
                createRepoObject("Shell")
              ]
            }
          }
        }
      }
    });
    const wrapper = mount(<TopLanguage/>);

    await act(async () => {
      await Promise.resolve(wrapper);
      await new Promise(resolve => setImmediate(resolve));
      wrapper.update();
    });

    expect(wrapper.find('.error')).toHaveLength(0);

    expect(wrapper.find('.top-language').childAt(1).text()).toEqual("JavaScript");
    expect(wrapper.find('.top-language').childAt(2).text())
      .toEqual("Top language in 2 repositories.");

    mock.mockRestore();
  });
});
