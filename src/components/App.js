/**
 * Main application component for the GitHub dashboard.
 * @author Andrew Jarombek
 * @since 4/9/2020
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader/root';

import React from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardItems from './DashboardItems';

const App = () => (
  <div className="app">
    <DashboardHeader />
    <DashboardItems />
  </div>
);

export default hot(App);
