/**
 * Unit tests with Jest and Enzyme for the MostRecentCommit component.
 * @author Andrew Jarombek
 * @since 4/25/2020
 */

import React from 'react';
import { mount } from 'enzyme';
import MostRecentCommit from '../../../src/components/items/MostRecentCommit';
import * as graphql from '../../../src/datasource/GraphQL';
import { act } from 'react-dom/test-utils';

describe('integration tests', () => {

  it('renders an error properly', async () => {
    const mock = jest.spyOn(graphql, 'getMostRecentCommit');
    mock.mockReturnValue({ data: { errors: [{ message: "Mock Error" }] } });
    const wrapper = mount(<MostRecentCommit/>);

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
    const mock = jest.spyOn(graphql, 'getMostRecentCommit');

    const createRepoObject = (name, pushedDate) => ({
      node: {
        name,
        ref: {
          target: {
            pushedDate
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
                createRepoObject("graphql-react-prototype", "2020-04-25T22:57:39Z"),
                createRepoObject("hadoop-prototypes", "2020-04-19T23:38:29Z"),
                createRepoObject("jarombek-com", "2020-04-19T20:53:12Z"),
                createRepoObject("jarombek-com-infrastructure", "2020-04-19T20:35:50Z"),
                createRepoObject("jarombek-com-database", "2020-04-19T18:16:23Z")
              ]
            }
          }
        }
      }
    });
    const wrapper = mount(<MostRecentCommit/>);

    await act(async () => {
      await Promise.resolve(wrapper);
      await new Promise(resolve => setImmediate(resolve));
      wrapper.update();
    });

    expect(wrapper.find('.error')).toHaveLength(0);

    expect(wrapper.find('.most-recent-commit').childAt(1).childAt(0).text())
      .toEqual("graphql-react-prototype");
    expect(wrapper.find('.most-recent-commit').childAt(1).childAt(1).text())
      .toEqual("Apr 25th, 2020 6:57 PM");

    mock.mockRestore();
  });
});
