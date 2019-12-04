import React from 'react';
// import { slide as Menu } from 'react-burger-menu';
import AppHeader from '../header';
import AppMap from '../map_leaflet';
import AppSidebar from '../sidebar';
import ReactModal from '../modal';
import Gallery from '../gallery';
import './style.scss';

const Notification = isNotification => {
  return (
    <div className='notification'>
      <div className='notification-text'>
        { isNotification.message }
      </div>
    </div>
  )
}

const Home = props => {
  const { 
    isOpen,
    onClose,
    isNotification
  } = props;

  return (
    <>
      <div className='app-layout'>
        <div className='app-content'>
          <AppHeader/>
          <AppMap/>
        </div>
        <aside className='app-sidebar'>
          <AppSidebar/>
        </aside>
      </div>
      <ReactModal
        isOpen={ isOpen }
        onRequestClose={ onClose }
        className="modal modal-gallery"
        overlayClassName="modal-mask"
      >
        <Gallery
          onClose={ onClose }
        />
      </ReactModal>
      { isNotification.notifi ? Notification(isNotification) : null }
    </>
  )
}

export default Home;