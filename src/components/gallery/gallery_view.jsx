import React from 'react';
import PropTypes from 'prop-types';
import GalleryItem from './gallery_item';
import Carousel, { Modal, ModalGateway } from 'react-images';
import './style.scss';

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
    inputRef,
    data
  } = props;

  return (
    <div className='gallery'>
      <div className="gallery-head">
        <div className="select-photo">
          <button 
            className='select-btn'
            onClick={ onSelected }
          >
            { isSelected ? 'Cancel' : 'select' }
          </button>
          { isSelected ?
            <button
              className="basket"
              disabled={ !isSelectedItem.check }
              onClick={ onRemoveItem }
            >
              <span className="icon-basket" />
            </button> : null }
        </div>
        <div className="head-title">Photos</div>
        <div className="head-close">
          <button className='close-btn' onClick={ onClose } />
        </div>
      </div>
      <div className="gallery-content">
        { data.map(item => (
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
                views={data}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
      <div className="gallery-drag-file">
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
  data: PropTypes.array
}

export default GalleryView;