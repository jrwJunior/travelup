import React from 'react';
import PropTypes from 'prop-types';

const GalleryItem = props => {
  const { 
    data,
    isSelected,
    isSelectedItem,
    onSelectedItem,
    onOpenLightBox
  } = props;

  const { selected, keys } = isSelectedItem;

  return (
    <div className='gallery-item'>
      {/* eslint-disable-next-line */}
      <a
        className={ `${ isSelected ? 'gallery-item-view on-selected' : 'gallery-item-view' }` }
        onClick={ !isSelected ? () => onOpenLightBox(data.name) : () => onSelectedItem(data.name) }
        >
        { selected && keys.includes(data.name) ? <span className="select-check-icon" /> : null }
        <div className='gallery-item-pic'>
          <img src={ data.src } alt="shows countries you visited"/>
        </div>
        <div className='gallery-item-box'/>
      </a>
    </div>
  )
}

GalleryItem.propTypes = {
  isSelected: PropTypes.bool,
  isSelectedItem: PropTypes.object,
  data: PropTypes.object
}

export default GalleryItem;