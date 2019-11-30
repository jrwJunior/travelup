import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const AuthInfoView = props => {
  const { location } = props;
  const currentPath = location.pathname === '/login' ? 'Sign In' : 'Sign Up';
  const a = location.pathname === '/login' ? '/register' : '/login';

  const info = {
    login:'to keep connected with us please login with your personal info',
    register: 'Enter your personal detail and start journey with us'
  }

  return (
    <div className='auth-information'>
    <div className='auth-information-heading'>{ currentPath }</div>
      <div className='auth-information-descr'>{ location.pathname === '/login' ? info.login : info.register }</div>
      <Link className='button-view' to={ a }>
        { location.pathname === '/login' ? 'Sign Up' : 'Sign In' }
      </Link>
    </div>
  )
}

export default withRouter(AuthInfoView);