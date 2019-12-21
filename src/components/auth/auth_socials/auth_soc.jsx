import React from 'react';
import { Redirect } from 'react-router';

const AuthSocials = props => {
  const { onSignInGoogle, onSignInFb, isLogined } = props;

  return (
    <div className="unlogged-socials-btn-container">
      <button
        type="button"
        className="unlogged-btn-social unlogged-btn-google"
        onClick={ onSignInGoogle }
      >
        <span className="icon-gpl" />
        <span className='google-label'>Google</span>
        { isLogined ? <Redirect to='/'/> : null }
      </button>
      <button
        type="button"
        className="unlogged-btn-social unlogged-btn-facebook"
        onClick={ onSignInFb }
      >
        <span className="icon-fb" />
        <span className='facebook-label'>Facebook</span>
        { isLogined ? <Redirect to='/'/> : null }
      </button>
    </div>
  )
}

export default AuthSocials;