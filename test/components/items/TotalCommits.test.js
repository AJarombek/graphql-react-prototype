/**
 * Unit tests with Jest and Enzyme for the TotalCommits component.
 * @author Andrew Jarombek
 * @since 4/25/2020
 */

import React from 'react';
import { mount } from 'enzyme';
import TotalCommits from '../../../src/components/items/TotalCommits';
import * as graphql from '../../../src/datasource/GraphQL';
import { act } from 'react-dom/test-utils';

describe('integration tests', () => {

  it('renders an error properly', async () => {
    const mock = jest.spyOn(graphql, 'getTotalCommits');
    mock.mockReturnValue({ data: { errors: [{ message: "Mock Error" }] } });
    const wrapper = mount(<TotalCommits/>);

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
    const mock = jest.spyOn(graphql, 'getTotalCommits');

    const createRepoObject = (name, totalCount) => ({
      node: {
        name,
        ref: {
          target: {
            history: {
              totalCount
            }
          }
        }
      }
    });

    mock.mockReturnValue({
      data: {
        data: {
          user: {
            repositories: {
              edges: [
                createRepoObject("graphql-react-prototype", 20),
                createRepoObject("data-analytics-prototypes", 35),
                createRepoObject("hadoop-prototypes", 28),
                createRepoObject("react-16-3-demo", 20),
                createRepoObject("saints-xctf-web", 30),
                createRepoObject("jarombek-react-components", 57),
                createRepoObject("saints-xctf-api", 141)
              ]
            }
          }
        }
      }
    });
    const wrapper = mount(<TotalCommits/>);

    await act(async () => {
      await Promise.resolve(wrapper);
      await new Promise(resolve => setImmediate(resolve));
      wrapper.update();
    });

    expect(wrapper.find('.error')).toHaveLength(0);

    expect(wrapper.find('.total-commits').childAt(1).childAt(0).text())
      .toEqual("saints-xctf-api");
    expect(wrapper.find('.total-commits').childAt(1).childAt(1).text())
      .toEqual("141");

    mock.mockRestore();
  });
});
