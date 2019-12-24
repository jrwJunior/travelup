import React, { Component } from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../home';
import PrivateRoute from '../auth/private_route';
import Auth from '../auth/auth_container';
import SingIn from '../auth/sign_in';
import SingUp from '../auth/sign_up';
import UnloggedTopbar from '../unlogged_topbar';

import './app.scss';

class App extends Component {
  state = {
    isOnline: true
  }

  componentDidMount() {
    window.addEventListener('online', () => this.handleOnliseStatus(true));
    window.addEventListener('offline', () => this.handleOnliseStatus(false));
  }
  
  componentWillUnmount() {
    window.removeEventListener('online');
    window.removeEventListener('offline');
  }

  handleOnliseStatus = status => {
    this.setState({ isOnline: status });
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
        { !this.state.isOnline ? (
          <div className='notice-status-connect'><span/>Travelup is offline</div>
        ) : null }
      </main>
    );
  }
}

export default withRouter(App);
