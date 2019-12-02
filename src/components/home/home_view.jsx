import React from 'react';
import AppHeader from '../header';
import AppMap from '../map_leaflet';
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
  const { isOpen, onClose, isNotification } = props;
  
  return (
    <>
      <AppHeader/>
      <div className='app-content'>
        <aside className='app-sidebar'>Sidebar</aside>
        <AppMap/>
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