import React from 'react';
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component:Component, ...rest }) => {
  const isUser = JSON.parse(localStorage.getItem('_user')) || null;

  return(
    <Route
      { ...rest }
      render={ routeProps => {
        return isUser && isUser.isLogined && isUser.uid ? <Component { ...routeProps } /> : <Redirect exact to='/login' />
      }}
    />
  )
};

export default PrivateRoute;
