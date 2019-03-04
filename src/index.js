import React from 'react';
import ReactDOM from 'react-dom';
import Router from './routers/index';
import { Provider } from 'react-redux';
import configureStore from './createStore';
import ErrorBoundary from './common/ErrorBoundary/index';
import 'antd/dist/antd.css';

const { store } = configureStore();

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}> 
      <Router />
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
);