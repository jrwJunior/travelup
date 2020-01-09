import React, { Component } from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../home';
import PrivateRoute from '../auth/private_route';
import Auth from '../auth/auth_container';
import SingIn from '../auth/sign_in';
import SingUp from '../auth/sign_up';
import UnloggedTopbar from '../unlogged_topbar';
import ModalInfo from '../modal';
import { modalOppened } from '../../actions/modal_actions';
import { connect } from 'react-redux';

import './app.scss';

class App extends Component {
  state = {
    isOnline: true,
    showInstallMessage: false
  }

  componentDidMount() {
    window.addEventListener('online', () => this.handleOnliseStatus(true));
    window.addEventListener('offline', () => this.handleOnliseStatus(false));

    if (this.handlePlatformIos() && !this.handleInStandaloneMode()) {
      setTimeout(() => this.setState({ showInstallMessage: true }), 15000);
    }

    if (navigator.userAgent.match(/Android/i) && !this.handleInStandaloneMode()) {
      this.handleInstall();
    }
  }

  componentDidUpdate() {
    if (!this.state.isOnline) {
      const message = 'The internet connection appears to be offline';
      this.props.showModal('offline', message);
    }

    if (this.state.showInstallMessage && this.state.isOnline) {
      const message = 'Install this application on your home screen for quick and easy access when you\'re on the go';
      this.props.showModal('install', message);
    }
  }
  
  componentWillUnmount() {
    window.removeEventListener('online');
    window.removeEventListener('offline');
  }

  handlePlatformIos() {
    const iosPlatform = [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ];
  
    if (!!navigator.platform) {
      while (iosPlatform.length) {
        if (navigator.platform === iosPlatform.pop()) { 
          return true; 
        }
      }
    }
  
    return false;
  }

  handleInStandaloneMode() {
    return ('standalone' in window.navigator) && (window.navigator.standalone);
  }

  handleOnliseStatus = status => {
    this.setState({ isOnline: status });
  }

  handleModalError = () => {
    this.setState({isOnline: true});
  }

  handleInstall() {
    const butInstall = document.getElementById('butInstall');
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', async evt => {
      deferredPrompt = evt;

      butInstall.addEventListener('click', () => { 
        const promptEvent = deferredPrompt
        if (!promptEvent) {
          return;
        }

        promptEvent.prompt();
        promptEvent.userChoice.then(result => {
          if (result.outcome === 'accepted') {
            console.log('User accepted the prompt');
          } else {
            console.log('User dismissed the prompt');
          }
          deferredPrompt = null;
        });
      });
    })
  }

  render() {
    const { location } = this.props;
    const url = ['/login', '/register'].find(el => el === location.pathname);

    return (
      <main className='main-content'>
        { url ? <UnloggedTopbar/> : null }
          <Switch>
            <PrivateRoute
              exact
              path="/"
              component={ Home }
            />
            <Route
              exact
              path='/login'
              render={ () => <Auth renderComponent={ SingIn } />} 
            />
            <Route
              path='/register'
              render={ () => <Auth renderComponent={ SingUp } />} 
            />
            <Redirect to='/' />
        </Switch>
        <ModalInfo
          className="modal modal-error"
          overlayClassName="modal-mask"
        />
      </main>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showModal: (id, body) => dispatch(modalOppened(id, body))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
