/**
 * Main application component for the GitHub dashboard.
 * @author Andrew Jarombek
 * @since 4/9/2020
 */

import { hot } from 'react-hot-loader/root';
import React from 'react';

const App = () => {
  return (
    <div className="app">
      <div className="header">
        <p>GraphQL React Prototype</p>
        <p>/</p>
        <p>GitHub</p>
        <p>/</p>
        <p>AJarombek</p>
      </div>

    </div>
  );
};

export default hot(App);
