/**
 * Snapshot test for the TotalCommits component.
 * @author Andrew Jarombek
 * @since 4/25/2020
 */

import React from 'react';
import TotalCommits from '../../../src/components/items/TotalCommits';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<TotalCommits />).toJSON();
  expect(tree).toMatchSnapshot();
});
