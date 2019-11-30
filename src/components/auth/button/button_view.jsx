import React from 'react';
import './style.scss';

const Button = props => {
  const { children, path, disabled } = props;
  const { pathname } = path;

  return (
    <button
      className='button-send'
      type="submit" 
      disabled={ disabled }
    >
      { pathname === '/register' ? 'Sign up' : 'Sign in' }
      { children }
    </button>
  );
}

export default Button;