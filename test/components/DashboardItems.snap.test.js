/**
 * Snapshot test for the DashboardItems component.
 * @author Andrew Jarombek
 * @since 4/25/2020
 */

import React from 'react';
import DashboardItems from '../../src/components/DashboardItems';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<DashboardItems />).toJSON();
  expect(tree).toMatchSnapshot();
});
