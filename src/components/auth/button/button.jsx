import React from 'react';
import { withRouter } from 'react-router-dom';
import './style.scss';

const Button = props => {
  const { children, location, disabled } = props;
  const { pathname } = location;

  return (
    <button
      className='unlogged-btn unlogged-btn-pink unlogged-btn-wide'
      type="submit" 
      disabled={ disabled }
    >
      { pathname === '/register' ? 'Sign up' : 'Sign in' }
      { children }
    </button>
  );
}

export default withRouter(Button);