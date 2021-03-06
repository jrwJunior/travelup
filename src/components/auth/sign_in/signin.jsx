import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import Social from '../auth_socials';
import Button from '../button';

const SignInView = props => {
  const { 
    handleSubmit,
    onValidate,
    valid,
    isLoading
  } = props;

  return(
    <>
      <div className='unlogged-heading-2'>Are you ready to travel ?</div>
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
          component={ props.renderProp }
        />
        <Button
          disabled={ !valid || isLoading }
          isLoading={ isLoading }
        />
      </form>
      <div className='unlogged-notice'>
        Not yet registered ? &nbsp;
        <Link to='/register'>
          Sign up
        </Link>
      </div>
    </>
  );
};

export default reduxForm({
  form: 'signin'
})(SignInView);
