import React from 'react';

const AuthSocials = props => {
  const { onSignInGoogle, onSignInFb } = props;

  return (
    <div className="unlogged-socials-btn-container">
      <button
        type="button"
        className="unlogged-btn-social unlogged-btn-google"
        onClick={ onSignInGoogle }
      >
        <span className="icon-gpl" />
        <span className='icon-label'>Google</span>
      </button>
      <button
        type="button"
        className="unlogged-btn-social unlogged-btn-facebook"
        onClick={ onSignInFb }
      >
        <span className="icon-fb" />
        <span className='icon-label'>Facebook</span>
      </button>
    </div>
  )
}

export default AuthSocials;