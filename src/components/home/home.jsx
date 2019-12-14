import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import AppHeader from '../header';
import AppMap from '../map_leaflet';
import AppSidebar from '../sidebar';
import ReactModal from '../modal';
import Gallery from '../gallery';
import Notification from '../notification';
import './style.scss';

const Home = props => {
  const { 
    isOpen,
    onClose,
    isNotice
  } = props;

  return (
    <>
      <div className='app-layout'>
        <div className='app-content'>
          <AppHeader/>
          <AppMap/>
        </div>
        
        <aside className='app-sidebar'>
          <Menu
            customCrossIcon={ false }
          >
            <AppSidebar/>
          </Menu>
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
      <Notification
        notice={ isNotice }
      />
    </>
  )
}

export default Home;