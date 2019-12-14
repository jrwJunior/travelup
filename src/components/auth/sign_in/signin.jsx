import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import Social from '../auth_socials';
import Button from '../button';

const SignInView = props => {
  const { 
    handleSubmit,
    onValidate,
    onFocus,
    onBlur,
    valid,
    location
  } = props;

  return(
    <>
      <div className='unlogged-heading-2'>Are you ready to travel ?</div>
      <Social/>
      <form className='unlogged-form' onSubmit={ handleSubmit }>
        <Field
          name="email"
          component={ props.renderProp }
          type="email"
          placeholder="Enter your email address"
          validate={ onValidate }
          onFocus={ onFocus }
          onBlur={ onBlur }
        />
        <Field
          name="password"
          component={ props.renderProp }
          type="password"
          placeholder="Enter your password"
          validate={ onValidate }
        />
        <Button
            disabled={ !valid }
            path={ location }
          >
            {/* { loading ? <Spinner/> : null } */}
          </Button>
        <span className='text-error'>{ props.authError.signIn }</span>
      </form>
      <div className='unlogged-notice'>
        Not yet registered on Easy Travel?&nbsp;
        <Link to='/register'>
          Sign up
        </Link>
      </div>
    </>
  );
};

export default reduxForm({
  form: 'signin'
})(withRouter(SignInView));
