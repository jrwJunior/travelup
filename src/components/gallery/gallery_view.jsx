import React from 'react';
import PropTypes from 'prop-types';
import GalleryItem from './gallery_item';
import Carousel, { Modal, ModalGateway } from 'react-images';
import './style.scss';

const GalleryGreeting = () => {
  return (
    <div className='gallery-title'>
      <span>You can upload your photos here.</span>
      <span className='pic-info'/>
    </div>
  )
}

const GalleryView = props => {
  const { 
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDrop,
    onChange,
    onClick,
    onClose,
    onSelected,
    onSelectedItem,
    onRemoveItem,
    onOpenLightbox,
    isSelected,
    isSelectedItem,
    islightboxOpen,
    isSelectedIndex,
    isImages,
    inputRef
  } = props;

  return (
    <div className='gallery'>
      <div className="gallery-head">
        <div className="select-photo">
          <button 
            className='select-btn'
            disabled={ !isImages.length }
            onClick={ onSelected }
          >
            { isSelected ? 'Cancel' : 'Select' }
          </button>
          { isSelected ? (
            <button
              className="gallery-basket"
              disabled={ !isSelectedItem.selected }
              onClick={ onRemoveItem }
            >
              <span className="icon-basket" />
            </button>
          ) : null }
        </div>
        <div className="head-title">{ isSelected ? 'Select items' : 'Photos' }</div>
        <div className="head-close">
          <button className='close-btn' onClick={ onClose } />
        </div>
        {/* { isLoading ? <Spinner mode='dark'/> : null } */}
      </div>
      <div className="gallery-content">
        { !isImages.length ? GalleryGreeting() : null }
        { isImages.map(item => (
          <GalleryItem
            key={ item.name }
            data={ item }
            isSelected={ isSelected }
            isSelectedItem={ isSelectedItem }
            onSelectedItem={ onSelectedItem }
            onOpenLightBox={ onOpenLightbox }
          />
        )) }
        <ModalGateway>
          { islightboxOpen ? (
            <Modal
              onClose={ onOpenLightbox }
            >
              <Carousel
                currentIndex={isSelectedIndex}
                views={isImages}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
      <div 
        className="drag-file"
        onDragEnter={ evt => onDragEnter(evt)}
        onDragOver={evt => onDragOver(evt)}
        onDragLeave={evt => onDragLeave(evt)}
        onDrop={evt => onDrop(evt)}
      >
      <>
        <input 
          className="input-file"
          onChange={evt => onChange(evt)}
          type="file" 
          name="file" 
          multiple accept="image/*"
          ref={ inputRef }
          />
        <div className="drag-info"> 
          Drag a file here or <span onClick={ onClick }>browse</span> for a file to upload
        </div>
      </>
      </div>
    </div>
  )
}

GalleryView.propTypes = {
  onDragEnter: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDrop: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  onSelected: PropTypes.func,
  onSelectedItem: PropTypes.func,
  onRemoveItem: PropTypes.func,
  onOpenLightbox: PropTypes.func,
  isSelected: PropTypes.bool,
  isSelectedItem: PropTypes.object,
  islightboxOpen: PropTypes.bool,
  isSelectedIndex: PropTypes.number,
  isImages: PropTypes.array,
  isLoading: PropTypes.bool
}

export default GalleryView;