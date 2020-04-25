/**
 * Snapshot test for the TopLanguage component.
 * @author Andrew Jarombek
 * @since 4/25/2020
 */

import React from 'react';
import TopLanguage from '../../../src/components/items/TopLanguage';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<TopLanguage />).toJSON();
  expect(tree).toMatchSnapshot();
});
