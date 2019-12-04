import React from 'react';
import { withRouter } from 'react-router-dom';
import Home from '../home';
import PrivateRoute from '../auth/private_route';
import AuthRoute from '../auth/auth_routing';

import './app.css';

const App = props => {
  const { pathname } = props.location;
  const pathAuth = ['/login', '/register'];

  return (
    <main className='main-content' id='main'>
      { pathAuth.some(el => el === pathname) ? <div className='homepage-photo'/> : null }
      <PrivateRoute
        exact
        path="/"
        component={ Home }
      />
      { pathAuth.some(el => el === pathname) ? <AuthRoute/> : null }
    </main>
  );
}

export default withRouter(App);
