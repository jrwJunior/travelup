import React from 'react';
import PropTypes from 'prop-types';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { Scrollbars } from 'react-custom-scrollbars';
import GalleryItem from './gallery_item';
import Spinner from '../spinner';
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
    isLoading,
    inputRef
  } = props;

  return (
    <div className='gallery'>
      <div className="gallery-head">
        <div className="select-photo">
          { isImages.length ? (
            <button 
              className='select-btn'
              onClick={ onSelected }
            >
              { isSelected ? 'Cancel' : 'Select' }
            </button>
          ) : null }
          { isSelected ? (
            <button
              className="gallery-basket"
              disabled={ !isSelectedItem.selected }
              onClick={ onRemoveItem }
            >
              <svg xmlns="http://www.w3.org/2000/svg" className='svg-icon' width='18' height='18' viewBox="0 0 512 512">
                <path d="M436 60h-90V45c0-24.813-20.187-45-45-45h-90c-24.813 0-45 20.187-45 45v15H76c-24.813 0-45 20.187-45 45v30c0 8.284 6.716 15 15 15h16.183L88.57 470.945l.011.129C90.703 494.406 109.97 512 133.396 512h245.207c23.427 0 42.693-17.594 44.815-40.926l.011-.129L449.817 150H466c8.284 0 15-6.716 15-15v-30c0-24.813-20.187-45-45-45zM196 45c0-8.271 6.729-15 15-15h90c8.271 0 15 6.729 15 15v15H196V45zm197.537 423.408c-.729 7.753-7.142 13.592-14.934 13.592H133.396a14.927 14.927 0 01-14.934-13.592L92.284 150h327.432l-26.179 318.408zM451 120H61v-15c0-8.271 6.729-15 15-15h360c8.271 0 15 6.729 15 15v15z"/>
                <path d="M256 180c-8.284 0-15 6.716-15 15v212c0 8.284 6.716 15 15 15s15-6.716 15-15V195c0-8.284-6.716-15-15-15zM346 180c-8.284 0-15 6.716-15 15v212c0 8.284 6.716 15 15 15s15-6.716 15-15V195c0-8.284-6.716-15-15-15zM166 180c-8.284 0-15 6.716-15 15v212c0 8.284 6.716 15 15 15s15-6.716 15-15V195c0-8.284-6.716-15-15-15z"/>
              </svg>
            </button>
          ) : null }
        </div>
        <div className="head-title">{ isSelected ? 'Select items' : 'Photos' }</div>
        <div className="head-close">
          <button className='close-btn' onClick={ onClose } >
            <svg xmlns="http://www.w3.org/2000/svg" className='svg-icon' viewBox="0 0 47.97 47.97">
              <path d="M28.23 23.99L47.09 5.12A3 3 0 1 0 42.85.88L23.99 19.74 5.12.88A3 3 0 1 0 .88 5.12L19.74 24 .88 42.85a3 3 0 1 0 4.24 4.24L24 28.23l18.86 18.86a3 3 0 0 0 4.24 0 3 3 0 0 0 0-4.24L28.23 23.99z" />
            </svg>
          </button>
        </div>
        { isLoading ? <Spinner mode='dark' width='20px' height='20px' /> : null }
      </div>
      <div className="gallery-content">
        <Scrollbars>
          <div className='gallery-wrapper'>
            { !isImages.length ? GalleryGreeting() : null }
            {isImages.map(item => (
              <GalleryItem
                key={ item.name }
                data={ item }
                isSelected={ isSelected }
                isSelectedItem={ isSelectedItem }
                onSelectedItem={ onSelectedItem }
                onOpenLightBox={ onOpenLightbox }
              />
            ))}
          </div>
        </Scrollbars>
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
         <span onClick={ onClick }>Browse</span> file to upload
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