import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './store/store';
import App from './components/app';
import './index.css';

const store = configureStore();

render(
  <Provider store={ store }>
    <Router basename={process.env.PUBLIC_URL}>
      <App/>
    </Router>
  </Provider>, 
  document.getElementById('root')
);