import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setDragFilesGallery, removeFiles } from '../../actions/gallery_actions';
import Gallery from './gallery_view';

class GalleryContainer extends Component {
  fileInput = React.createRef();

  state = {
    lightboxIsOpen: false,
    selectedIndex: 0,
    selected: false,
    selectedItem: {
      check: false,
      names: []
    }
  }

  handleClick = () => {
    this.fileInput.current.click();
  }

  handleChange = evt => {
    const { uid, setPhotosGallery, map } = this.props;
    const fileList = evt.target.files;

    setPhotosGallery(uid, map.id, fileList);
  }

  handleDragOverEnter(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    evt.target.classList.add('dragover');
  }

  handleDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const rect = evt.target.getBoundingClientRect();
    const dx = evt.clientX - rect.left;
    const dy = evt.clientY - rect.top;
    if ((dx < 0) || (dx >= rect.width) || (dy < 0) || (dy >= rect.height)) {
        evt.target.classList.remove('dragover');
    };
  }

  handleDragDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    evt.target.classList.remove('dragover');
		// const fileList = evt.dataTransfer.files;
  }

  handleSelected = () => {
    this.setState(state => {
      return {
        selected: !state.selected
      }
    });
  }

  handleSelectItem = val => {
    this.setState(({ selectedItem }) => {
      const keys = selectedItem.names;
      const index = keys.findIndex(el => el === val);
      const newArray = [];
      
      // eslint-disable-next-line
      if (index == '-1') {
        newArray.push(...keys.concat(val));
      } else {
        keys.splice(index, 1);
        newArray.push(...keys);
      }

      return {
        selectedItem: {
          check: !!newArray.length,
          names: newArray
        }
      }
    });
  }

  handleRemoveItem = () => {
    const { selectedItem } = this.state;
    const { uid, map, removeItem } = this.props;

    removeItem(uid, map.id, selectedItem);
    this.setState({
      selectedItem: {
        check: false,
        names: []
      }
    });
  }

  handleOpenLightbox = name => {
    const { gallery: data, map } = this.props;
    const selectedIndex = data[map.id].findIndex(item => item.name === name);
    
    this.setState(state => {
      return {
        lightboxIsOpen: !state.lightboxIsOpen,
        selectedIndex
      }
    })
  };

  render() {
    const { gallery, map } = this.props;
    const { selected, selectedItem, lightboxIsOpen, selectedIndex } = this.state;

    return (
      <Gallery
        onDragEnter={ this.handleDragOverEnter }
        onDragOver={ this.handleDragOverEnter }
        onDragLeave={ this.handleDragLeave }
        onDrop={ this.handleDragDrop }
        onChange={ this.handleChange }
        onClick={ this.handleClick }
        onSelected={ this.handleSelected }
        onSelectedItem={ this.handleSelectItem }
        onRemoveItem={ this.handleRemoveItem }
        onOpenLightbox={ this.handleOpenLightbox }
        isSelected={ selected }
        isSelectedItem={ selectedItem }
        islightboxOpen={ lightboxIsOpen }
        isSelectedIndex={ selectedIndex }
        inputRef={ this.fileInput }
        data={ gallery[map.id] }
      />
    )
  }
}

const mapStateToProps = ({ fb, gallery, map }) => {
  return {
    uid: fb.auth.uid,
    gallery,
    map
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPhotosGallery: (uid, id, files) => dispatch(setDragFilesGallery(uid, id, files)),
    removeItem: (uid, id, removeEl) => dispatch(removeFiles(uid, id, removeEl))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(GalleryContainer);