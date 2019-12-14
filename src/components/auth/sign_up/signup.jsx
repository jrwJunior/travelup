import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import Button from '../button';
import Social from '../auth_socials';

const SignUpView = props => {
  const { 
    handleSubmit,
    onValidate,
    onToggleShowPassword,
    valid,
    location,
    showHide
   } = props;

  return(
    <>
      <div className='unlogged-heading-2'>Ready to sign up?</div>
      <Social/>
      <form className='unlogged-form' onSubmit={ handleSubmit }>
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
          name="confirmpassword"
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
            disabled={ !valid }
            path={ location }
          >
            {/* { loading ? <Spinner/> : null } */}
          </Button>
          <span className='text-error'>{  props.authError.signUp }</span>
        </div>
      </form>
    </>
  );
};

export default reduxForm({
  form: 'signup'
})(withRouter(SignUpView));
