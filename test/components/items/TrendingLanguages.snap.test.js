/**
 * Snapshot test for the TrendingLanguages component.
 * @author Andrew Jarombek
 * @since 4/25/2020
 */

import React from 'react';
import TrendingLanguages from '../../../src/components/items/TrendingLanguages';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<TrendingLanguages />).toJSON();
  expect(tree).toMatchSnapshot();
});
