/**
 * Snapshot test for the RepositoryCount component.
 * @author Andrew Jarombek
 * @since 4/25/2020
 */

import React from 'react';
import RepositoryCount from '../../../src/components/items/RepositoryCount';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<RepositoryCount />).toJSON();
  expect(tree).toMatchSnapshot();
});
