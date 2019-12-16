import React from 'react';
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component:Component, ...rest }) => {
  const user = JSON.parse(localStorage.getItem('_user'));

  return(
    <Route
      { ...rest }
      render={ routeProps => {
        return user.isLogined ? <Component { ...routeProps } /> : <Redirect exact to='/login' />
      }}
    />
  )
};

export default PrivateRoute;
