import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.scss';

const AppPopperView = props => {
  const { 
    onClickCheck,
    onChangeFile,
    onCancel,
    isChecked,
    onLogout,
    nodeRef,
    userData,
    isLogout
  } = props;

  return (
    <div className="popper" ref={ nodeRef }>
    <div className="popper-content popper-lg">
    {/* eslint-disable-next-line */}
      <a
        className='account-header animate-wobble'
        onClick={ onChangeFile }
      >
        <div className='account-thumbnail'>
          <figure className='thumbnail thumbnail-rounded'>
            <div className='user-action-profile'>
              <img src={ userData.userAvatar }  alt=""/>
            </div>
          </figure>
          <span className='picture-edit'/>
        </div>
        <div className='account-heading ellipsis'>
          <span className='account-name'>Edit Photo</span>
        </div>
        <svg className="svg-icon svg-icon-chevron-right animate-wobble-target" focusable="false" height="12" width="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M7.3 6l-4.5 4.4a.9.9 0 0 0 0 1.3.8.8 0 0 0 1.3 0l5.2-5.1a.9.9 0 0 0 0-1.2L4.1.3a.9.9 0 0 0-1.3 0 .9.9 0 0 0 0 1.3z"></path></svg>
      </a>
      <ul
        className='account-menu'
        role='navigation'
      >
        <li className='account-item'>
        {/* eslint-disable-next-line */}
          <a
            className='account-link is-main animate-wobble'
            role='button'
            onClick={ onLogout }
          >
            { isLogout ? <Redirect to='/login'/> : null }
            Log out
          </a>
        </li>
        <li className='account-item'>
         <div className='account-input'>
           <div className='account-input-label is-main'>Dark mode</div>
           <label 
              className={ `input-switch ${ isChecked ? 'is-checked' : '' }` }
              onClick={ onClickCheck }
            >
             <input type="checkbox" className='input-control' />
           </label>
         </div>
        </li>
        <li className='account-item'>
          {/* eslint-disable-next-line */}
          <a 
            className='popper-cancel'
            role='button'
            onClick={ onCancel }
          >
            Cancel
          </a>
        </li>
      </ul>
    </div>
    <div className='popper-arrow'></div>
  </div>
  )
}

AppPopperView.propTypes = {
  onClickCheck: PropTypes.func,
  onLogout: PropTypes.func,
  isChecked: PropTypes.bool,
  userData: PropTypes.object
}

export default AppPopperView;