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
              <svg xmlns="http://www.w3.org/2000/svg" className='svg-icon' viewBox="0 0 512 512" width='15' height='15'>
                <path d="M64.666 182l23.917 289.072C90.707 494.407 109.97 512 133.393 512h245.215c23.423 0 42.686-17.593 44.824-41.06L447.336 182H64.666zM181 407c0 8.291-6.709 15-15 15s-15-6.709-15-15V227c0-8.291 6.709-15 15-15s15 6.709 15 15v180zm90 0c0 8.291-6.709 15-15 15s-15-6.709-15-15V227c0-8.291 6.709-15 15-15s15 6.709 15 15v180zm90 0c0 8.291-6.709 15-15 15s-15-6.709-15-15V227c0-8.291 6.709-15 15-15s15 6.709 15 15v180zM436 60H331V45c0-24.814-20.186-45-45-45h-60c-24.814 0-45 20.186-45 45v15H76c-24.814 0-45 20.186-45 45v30c0 8.291 6.709 15 15 15h420c8.291 0 15-6.709 15-15v-30c0-24.814-20.186-45-45-45zm-135 0h-90V45c0-8.276 6.724-15 15-15h60c8.276 0 15 6.724 15 15v15z"/>
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