import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import Button from '../button';
import Social from '../auth_socials';

const SignUpView = props => {
  const { 
    handleSubmit,
    onValidate,
    onToggleShowPassword,
    valid,
    showHide,
    isLoading
   } = props;

  return(
    <>
      <div className='unlogged-heading-2'>Ready to sign up?</div>
      <Social/>
      <form 
        className='unlogged-form' 
        onSubmit={ handleSubmit }
      >
        <Field
          name="email"
          type="email"
          placeholder="Enter your email address"
          validate={ onValidate }
          component={ props.renderProp }
        />
        <Field
          name="password"
          type="password"
          placeholder="Enter your password"
          validate={ onValidate }
          visiblePass
          infoPass
          showHidePassword={ showHide }
          onShowPassword={ onToggleShowPassword }
          component={ props.renderProp }
        />
        <Field
          name="confirm"
          type="password"
          placeholder="Enter your re-password"
          validate={ onValidate }
          visiblePass
          showHidePassword={ showHide }
          onShowPassword={ onToggleShowPassword }
          component={ props.renderProp }
        />
        <div className='auth-button'> 
          <Button
            disabled={ !valid || isLoading }
            isLoading={ isLoading }
          />
        </div>
      </form>
      <div className='unlogged-notice unlogged-notice-register'>
        Already registered ? &nbsp;
        <Link to='/login'>
          Sign in
        </Link>
      </div>
    </>
  );
};

export default reduxForm({
  form: 'signup'
})(SignUpView);
