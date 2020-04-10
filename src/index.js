/**
 * Bootstrap React onto the DOM at the 'root' id.
 * @author Andrew Jarombek
 * @since 4/9/2020
 */

import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";

ReactDOM.render(<App />, document.getElementById('root'));
