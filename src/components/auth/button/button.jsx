import React from 'react';
import { withRouter } from 'react-router-dom';
import './style.scss';

const Button = props => {
  const {location, disabled, isLoading } = props;
  const { pathname } = location;
  const url = ['/login','/register'].find(url => url === pathname);

  return (
    <button
      className='unlogged-btn unlogged-btn-pink unlogged-btn-wide'
      type="submit" 
      disabled={ disabled }
    >
      { url ? isLoading ? 'Loading...' : 'Sign up' : 'Sign in' }
    </button>
  );
}

export default withRouter(Button);