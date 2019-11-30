import React from 'react';

const AuthSocials = props => {
  const { onSignInGoogle, onSignInFb } = props;

  return (
    <div className="auth-socials">
      <button
        type="button"
        className="auth-social-button"
        onClick={ onSignInGoogle }
      >
        <span className="icon-gpl" />
      </button>
      <button
        type="button"
        className="auth-social-button"
        onClick={ onSignInFb }
      >
        <span className="icon-fb" />
      </button>
    </div>
  )
}

export default AuthSocials;