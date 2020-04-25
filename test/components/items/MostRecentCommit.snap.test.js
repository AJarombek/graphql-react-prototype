/**
 * Snapshot test for the MostRecentCommit component.
 * @author Andrew Jarombek
 * @since 4/25/2020
 */

import React from 'react';
import MostRecentCommit from '../../../src/components/items/MostRecentCommit';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<MostRecentCommit />).toJSON();
  expect(tree).toMatchSnapshot();
});
