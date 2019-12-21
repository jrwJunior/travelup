import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './store/store';
import App from './components/app';
import './index.css';
import * as serviceWorker from './serviceWorker';

const store = configureStore();

render(
  <Provider store={ store }>
    <Router>
      <App/>
    </Router>
  </Provider>, 
  document.getElementById('root')
);

serviceWorker.unregister();
