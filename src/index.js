import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Store from './Store'
import App from './components/App'

ReactDOM.render(
    <App />, document.querySelector('#app')
);