/**
 * Snapshot test for the MostPopularLanguages component.
 * @author Andrew Jarombek
 * @since 4/25/2020
 */

import React from 'react';
import MostPopularLanguages from '../../../src/components/items/MostPopularLanguages';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<MostPopularLanguages />).toJSON();
  expect(tree).toMatchSnapshot();
});
