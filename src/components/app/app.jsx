import React from 'react';
import { withRouter, Route, Switch, Link } from 'react-router-dom';
import Home from '../home';
import PrivateRoute from '../auth/private_route';
import Auth from '../auth/auth_container';
import SingIn from '../auth/sign_in';
import SingUp from '../auth/sign_up';
import Logo from '../logo';

import './app.css';

const App = () => {
  return (
    <main className='main-content'>
      <header className='topbar'>
        <div className='react-container'>
          <div className='header-col'>
            <Logo/>
          </div>
          <div className='header-col'>
            <Link className='unlogged-btn unlogged-btn-blue unlogged-btn-small unlogged-btn-outline' to='/login'>
              <span className='unlogged-btn-label'>Login</span>
            </Link>
            <Link className='unlogged-btn unlogged-btn-blue unlogged-btn-small' to='/register'>
              <span className='unlogged-btn-label'>Sign up</span>
            </Link>
          </div>
        </div>
      </header>
      <Switch>
        <PrivateRoute
          exact
          path="/"
          component={ Home }
        />
        <Route
          exact
          path='/login'
          render={ () => <Auth renderComponent={ SingIn } />} 
        />
        <Route
          path='/register'
          render={ () => <Auth renderComponent={ SingUp } />} 
        />
    </Switch>
    </main>
  );
}

export default withRouter(App);
