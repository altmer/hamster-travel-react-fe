/* eslint react/jsx-filename-extension: 0 */

import 'bootstrap/dist/css/bootstrap.css';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'react-toastify/dist/ReactToastify.css';

import 'moment/locale/en-gb';
import 'moment/locale/ru';

import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';

import client from './api/client';
import App from './components/App';

import './index.css';

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
