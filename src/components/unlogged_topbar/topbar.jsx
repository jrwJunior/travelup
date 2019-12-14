import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../logo';
import './style.scss';

const Topbar = () => {
  return (
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
  )
}

export default Topbar;