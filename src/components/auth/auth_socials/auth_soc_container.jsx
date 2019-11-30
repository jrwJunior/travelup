import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from "firebase/app";
import { signInGoogle } from '../../../actions/auth_actions';
import AuthSocials from './auth_soc_view';

class AuthSocialsContainer extends Component {
  providerGoogle = new firebase.auth.GoogleAuthProvider();
  providerFacebook = new firebase.auth.FacebookAuthProvider();

  signInGoogle = () => {
    this.props.signIn(this.providerGoogle);
    this.props.history.push('/');
  };

  signInFacebook = () => {
    this.props.fb.auth.signInWithPopup(this.providerFacebook);
  }

  render() {
    return (
      <AuthSocials
        onSignInGoogle={ this.signInGoogle }
        onSignInFb={ this.signInFacebook }
      />
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: provider => dispatch(signInGoogle(provider))
  }
}

export default connect(null, mapDispatchToProps)(withRouter(AuthSocialsContainer));