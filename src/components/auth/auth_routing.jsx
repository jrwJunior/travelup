import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from './auth_container';
import SingIn from './sign_in';
import SingUp from './sign_up';
import AuthInfo from './auth_info';
import './style.scss';

const AuthRoute = () => {
  return (
    <div className='auth-container'>
      <AuthInfo/>
      <Switch>
        <Route
          exact
          path='/login'
          render={ () => (
            <Auth
              renderComponent={ SingIn }
            />
          )} />
        <Route
          path='/register'
          render={ () => (
            <Auth
              renderComponent={ SingUp }
            />
          )} />
      </Switch>
    </div>
  )
}

export default AuthRoute;