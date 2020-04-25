/**
 * Unit tests with Jest and Enzyme for the TrendingLanguages component.
 * @author Andrew Jarombek
 * @since 4/18/2020
 */

import React from 'react';
import { mount } from 'enzyme';
import TrendingLanguages from '../../../src/components/items/TrendingLanguages';
import * as graphql from '../../../src/datasource/GraphQL';

describe('integration tests', () => {

  it('renders an error properly', async () => {
    const mock = jest.spyOn(graphql, 'getRecentTopLanguages');
    mock.mockReturnValue({ data: { errors: [{ message: "Mock Error" }] } });
    const wrapper = await mount(<TrendingLanguages/>);
    wrapper.update();

    expect(wrapper.find('.error')).toHaveLength(1);
    expect(wrapper.find('.error').text()).toEqual("Mock Error");

    expect(wrapper.find('figure')).toHaveLength(0);

    mock.mockRestore();
  });

  it('renders data properly', async () => {
    const mock = jest.spyOn(graphql, 'getRecentTopLanguages');
    mock.mockReturnValue({
      data: {
        data: {
          user: {
            repositories: {
              edges: [
                {
                  node: {
                    name: "graphql-react-prototype",
                    createdAt: "2020-04-07T23:04:29Z",
                    primaryLanguage: {
                      name: "JavaScript"
                    }
                  }
                },
                {
                  node: {
                    name: "hadoop-prototypes",
                    createdAt: "2020-02-02T17:15:35Z",
                    primaryLanguage: {
                      name: "Shell"
                    }
                  }
                },
                {
                  node: {
                    name: "react-16-3-demo",
                    createdAt: "2020-01-20T22:12:12Z",
                    primaryLanguage: {
                      name: "JavaScript"
                    }
                  }
                },
                {
                  node: {
                    name: "saints-xctf-infrastructure",
                    createdAt: "2018-11-29T11:41:33Z",
                    primaryLanguage: {
                      name: "HCL"
                    }
                  }
                }
              ]
            }
          }
        }
      }
    });
    const wrapper = await mount(<TrendingLanguages/>);
    wrapper.update();

    expect(wrapper.find('.error')).toHaveLength(0);

    expect(wrapper.find('.trending-languages').childAt(1).childAt(0).text())
      .toEqual("JavaScript");
    expect(wrapper.find('.trending-languages').childAt(1).childAt(1).text())
      .toEqual("2");

    expect(wrapper.find('.trending-languages').childAt(2).childAt(0).text())
      .toEqual("Shell");
    expect(wrapper.find('.trending-languages').childAt(2).childAt(1).text())
      .toEqual("1");

    mock.mockRestore();
  });
});
