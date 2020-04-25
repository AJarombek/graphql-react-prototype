/**
 * Snapshot test for the MostProductiveWeeks component.
 * @author Andrew Jarombek
 * @since 4/25/2020
 */

import React from 'react';
import MostProductiveWeeks from '../../../src/components/items/MostProductiveWeeks';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<MostProductiveWeeks />).toJSON();
  expect(tree).toMatchSnapshot();
});
