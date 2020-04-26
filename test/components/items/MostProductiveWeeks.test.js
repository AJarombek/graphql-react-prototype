/**
 * Unit tests with Jest and Enzyme for the MostProductiveWeeks component.
 * @author Andrew Jarombek
 * @since 4/25/2020
 */

import React from 'react';
import { mount } from 'enzyme';
import MostProductiveWeeks from '../../../src/components/items/MostProductiveWeeks';
import * as graphql from '../../../src/datasource/GraphQL';
import { act } from 'react-dom/test-utils';

describe('integration tests', () => {

  it('renders an error properly', async () => {
    const mock = jest.spyOn(graphql, 'getWeeklyContributionCounts');
    mock.mockReturnValue({ data: { errors: [{ message: "Mock Error" }] } });
    const wrapper = mount(<MostProductiveWeeks/>);

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
    const mock = jest.spyOn(graphql, 'getWeeklyContributionCounts');

    const createWeekObject = (firstDay, counts) => ({
      firstDay,
      contributionDays: counts.map(value => ({ contributionCount: value }))
    });

    mock.mockReturnValue({
      data: {
        data: {
          user: {
            contributionsCollection: {
              contributionCalendar: {
                weeks: [
                  createWeekObject("2020-04-19", [5, 1, 2, 1, 2, 1, 4]),
                  createWeekObject("2019-05-12", [10, 3, 6, 2, 2, 3, 6]),
                  createWeekObject("2019-12-29", [7, 7, 6, 4, 2, 3, 3]),
                  createWeekObject("2019-12-22", [4, 1, 4, 2, 6, 7, 6]),
                  createWeekObject("2019-11-10", [5, 3, 5, 2, 2, 5, 7]),
                  createWeekObject("2019-11-24", [8, 6, 6, 4, 1, 2, 1])
                ]
              }
            }
          }
        }
      }
    });
    const wrapper = mount(<MostProductiveWeeks/>);

    await act(async () => {
      await Promise.resolve(wrapper);
      await new Promise(resolve => setImmediate(resolve));
      wrapper.update();
    });

    expect(wrapper.find('.error')).toHaveLength(0);

    expect(wrapper.find('.most-productive-weeks').childAt(1).childAt(0).text())
      .toEqual("2019-05-12");
    expect(wrapper.find('.most-productive-weeks').childAt(1).childAt(1).text())
      .toEqual("32 Commits");

    mock.mockRestore();
  });
});
