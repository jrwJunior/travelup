import React, { Component as ReactComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn, signUp } from '../../../actions/auth_actions';
import Input from '../input';

class authContainer extends ReactComponent {
  handleSubmit = async(values) => {

    const { location } = this.props;

    switch(location.pathname) {
      case '/login':
        await this.props.signIn(values);
        break;
      case '/register':
        await this.props.signUp(values);
        break;
      default:
        break;
    }

    if (this.props.authorizedUser) {
      this.props.history.push('/');
    }
  };

  handleValidate = (values, field) => {
    if (!values || !values.length) {
      return 'Require field';
    }

    switch(values) {
      case field.username:
        return this.handleValidUserName(field.username);
      case field.email:
        return this.handleValidUserEmail(field.email);
      case field.password:
        return this.handleValidUserPassword(field.password);
      case field.confirmpassword:
        return this.handleValidConfirmPass(field.confirmpassword, field.password);
      default:
        break;
    }
  }

  handleValidUserName = value => {
     if (value && value.length < 2) {
      return 'Name must be at least 2 characters';
    }

    return undefined;
  }

  handleValidUserEmail = value => {
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regExp.test(String(value).toLowerCase())) {
      return 'Invalid email';
    }

    return undefined;
  }

  handleValidUserPassword = value => {
    const regExp = /^(?=.*[a-z])(?=.*\d).{6,}$/;

    if (value.length < 6) {
      return 'At least 6 characters';
    } else if (!regExp.test(value)) {
      return 'Password must contain letters and numbers';
    }

    return undefined;
  }

  handleValidConfirmPass = ( password, confirmPassword ) => {
    if (!confirmPassword) {
      return 'Require field';
    } else if (confirmPassword !== password) {
      return 'Passwords do not match';
    }

    return undefined;
  }

  render() {
    const { 
      renderComponent: Component,
      authError
    } = this.props;

    return(
      <Component
        renderProp={ props => <Input { ...props } /> }
        onSubmit={ this.handleSubmit }
        onValidate={ this.handleValidate }
        authError={ authError }
      />
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    authError: auth.authError,
    authorizedUser: auth.authorizedUser,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds)),
    signUp: creds => dispatch(signUp(creds))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(withRouter(authContainer));
