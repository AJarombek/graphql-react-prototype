/**
 * Snapshot test for the DashboardHeader component.
 * @author Andrew Jarombek
 * @since 4/25/2020
 */

import React from 'react';
import DashboardHeader from '../../src/components/DashboardHeader';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<DashboardHeader />).toJSON();
  expect(tree).toMatchSnapshot();
});
