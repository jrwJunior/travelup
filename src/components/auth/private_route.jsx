import React from 'react';
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component:Component, ...rest }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  return(
    <Route
      { ...rest }
      render={ routeProps => {
        return user.loggedIn ? <Component { ...routeProps } /> : <Redirect exact to='/login' />
      }}
    />
  )
};

export default PrivateRoute;
