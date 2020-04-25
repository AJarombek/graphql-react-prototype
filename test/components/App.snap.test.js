/**
 * Snapshot test for the App component.
 * @author Andrew Jarombek
 * @since 4/25/2020
 */

import React from 'react';
import App from '../../src/components/App';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
