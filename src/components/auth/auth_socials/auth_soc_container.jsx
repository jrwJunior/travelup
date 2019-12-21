import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from "firebase/app";
import { signInSocials } from '../../../actions/auth_actions';
import AuthSocials from './auth_soc'

class AuthSocialsContainer extends Component {
  providerGoogle = new firebase.auth.GoogleAuthProvider();
  providerFacebook = new firebase.auth.FacebookAuthProvider();

  signInGoogle = () => {
    this.props.signInGoogle(this.providerGoogle);
  };

  signInFacebook = () => {
    this.props.signInFacebook(this.providerFacebook);
  }

  render() {
    return (
      <AuthSocials
        onSignInGoogle={ this.signInGoogle }
        onSignInFb={ this.signInFacebook }
        isLogined={ this.props.isLogined }
      />
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    isLogined: auth.isLogined
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signInGoogle: provider => dispatch(signInSocials(provider)),
    signInFacebook: provider => dispatch(signInSocials(provider))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(withRouter(AuthSocialsContainer));