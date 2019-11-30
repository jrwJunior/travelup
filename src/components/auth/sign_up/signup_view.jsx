import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
// import Spinner from '../../app_spinner';
import Button from '../button';
import AuthSocial from '../auth_socials';

const SignUpView = props => {
  const { 
    handleSubmit,
    onValidate,
    valid,
    location
   } = props;

  return(
    <div className='wrapper-auth'>
      <div className='auth-title'>{ location.pathname === '/register' ? 'Sign up  your account' : null }</div>
      <AuthSocial/>
      <span className='auth-or'>or use your email from registration:</span>
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
        <Field
          name="confirmpassword"
          component={ props.renderProp } 
          type="password"
          placeholder="Enter your re-password"
          validate={ onValidate }
        />
        <div className='auth-button'> 
          <Button
            disabled={ !valid }
            path={ location }
          >
            {/* { loading ? <Spinner/> : null } */}
          </Button>
          <span className='auth-error text-error'>{  props.authError.signUp }</span>
        </div>
      </form>
    </div>
  );
};

export default reduxForm({
  form: 'signup'
})(withRouter(SignUpView));
