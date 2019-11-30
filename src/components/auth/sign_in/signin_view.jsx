import React from 'react';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
// import Spinner from '../../app_spinner';
import Button from '../button';
import AuthSocial from '../auth_socials';

const SignInView = props => {
  const { 
    handleSubmit,
    onValidate,
    valid,
    location
  } = props;

  return(
    <div className='wrapper-auth'>
      <div className='auth-title'>{ location.pathname === '/login' ? 'Sign in  your account' : null }</div>
      <AuthSocial/>
      <span className='auth-or'>or use your email account:</span>
      <form className='auth' onSubmit={ handleSubmit }>
        <Field
          name="email"
          component={ props.renderProp }
          type="email"
          placeholder="Enter your email address"
          validate={ onValidate }
        />
        <Field
          name="password"
          component={ props.renderProp }
          type="password"
          placeholder="Enter your password"
          validate={ onValidate }
        />
        <div className='auth-button'>
          <Button
            disabled={ !valid }
            path={ location }
          >
            {/* { loading ? <Spinner/> : null } */}
          </Button>
        </div>
        <span className='auth-error text-error'>{ location.pathname !== '/login' ? null : props.authError.signIn }</span>
      </form>
    </div>
  );
};

export default reduxForm({
  form: 'signin'
})(withRouter(SignInView));
