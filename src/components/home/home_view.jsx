import React from 'react';
import AppHeader from '../header';
import AppMap from '../map_leaflet';
import ReactModal from '../modal';
import Gallery from '../gallery';
import './style.scss';

const Home = props => {
  const { isOpen, onClose } = props;
  
  return (
    <div className='app-layout'>
      <div className='app-wrapper'>
        <div className='app-content'>
          <AppHeader/>
          <AppMap/>
        </div>
        <aside className='app-sidebar'>Sidebar</aside>
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
    </div>
  )
}

export default Home;