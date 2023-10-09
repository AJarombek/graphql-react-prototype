/**
 * Bootstrap React onto the DOM at the 'root' id.
 * @author Andrew Jarombek
 * @since 4/9/2020
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-hot-loader';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
