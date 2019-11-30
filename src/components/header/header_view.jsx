import React from 'react';
import UploadAvatar from '../upload_avatar';
import UploadFile from '../upload_file';
import './style.scss';

const Header = () => {
  return (
    <header className='app-header'>
      <div className="app-header-container">
        <div className="app-header-title">
          Dashborad
        </div>
        <div className='app-header-right'>
          <UploadFile/>
          <UploadAvatar/>
        </div>
      </div>
    </header>
  )
}

export default Header;