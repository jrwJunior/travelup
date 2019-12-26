import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const Logo = () => {
  return (
    <Link to="/" className='app-logo'>
      <span className='app-logo-pic'/>
      <span className='app-logo-text'>
        <span>Tra</span>velup
      </span>
    </Link>
  )
}

export default Logo;