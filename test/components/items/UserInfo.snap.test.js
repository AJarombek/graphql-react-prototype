/**
 * Snapshot test for the UserInfo component.
 * @author Andrew Jarombek
 * @since 4/25/2020
 */

import React from 'react';
import UserInfo from '../../../src/components/items/UserInfo';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<UserInfo />).toJSON();
  expect(tree).toMatchSnapshot();
});
