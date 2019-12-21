import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setGalleryPhoto, deletedData } from '../../actions/gallery_actions';
import { deleteGPSCoordinates, setGPSCoordinatesOfPhotos } from '../../actions/map_actions';
import { modalOppened } from '../../actions/modal_actions';
import ServicesGeoCordinats from '../../services/service_geo_cordinats';
import Gallery from './gallery';

class GalleryContainer extends Component {
  fileInput = React.createRef();
  serviceGeoCordinats = new ServicesGeoCordinats();

  state = {
    lightboxIsOpen: false,
    selectedIndex: 0,
    selected: false,
    selectedItem: {
      selected: false,
      keys: []
    }
  }

  handleClick = () => {
    this.fileInput.current.click();
  }

  handleChange = async(evt) => {
    const { map, setPhotosGallery, setCoordinates } = this.props;
    const { selectMapId } = map;
    const fileList = evt.target.files;
    const isCoincidence = map.marks.some(({ id }) => id.includes(selectMapId));

    if (!isCoincidence) {
      const { latlng }  = await this.serviceGeoCordinats.getCords(selectMapId);

      setCoordinates({
        lat: latlng[0],
        lon: latlng[1],
        id: selectMapId
      });
    }

    setPhotosGallery(selectMapId, fileList);
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
      const isSelect = !!state.selectedItem.keys.length;

      return {
        selected: !state.selected,
        selectedItem: {
          selected: isSelect,
          keys: []
        }
      }
    });
  }

  handleSelectItem = val => {
    this.setState(({ selectedItem }) => {
      const keys = selectedItem.keys;
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
          selected: !!newArray.length,
          keys: newArray
        }
      }
    });
  }

  handleRemoveItem = async() => {
    const { selectedItem } = this.state;
    const { map, deleteDataItem, deleteMapCords } = this.props;
    const { selectMapId } = map;

    this.setState({
      selected: false,
      selectedItem: {
        selected: false,
        keys: []
      }
    });

    deleteDataItem(selectMapId, selectedItem);
    deleteMapCords(selectMapId);
  }

  handleOpenLightbox = name => {
    const { data, map } = this.props;
    const { selectMapId } = map;
    const selectedIndex = data[selectMapId].findIndex(item => item.name === name);
    
    this.setState(state => {
      return {
        lightboxIsOpen: !state.lightboxIsOpen,
        selectedIndex
      }
    })
  };

  render() {
    const { data, map, closeModal, isLoading } = this.props;
    const { selected, selectedItem, lightboxIsOpen, selectedIndex } = this.state;
    const { selectMapId } = map;
    const images = [];

    if (data.hasOwnProperty(selectMapId)) {
      data[selectMapId].forEach(el => images.push(el));
    }

    return (
      <Gallery
        onDragEnter={ this.handleDragOverEnter }
        onDragOver={ this.handleDragOverEnter }
        onDragLeave={ this.handleDragLeave }
        onDrop={ this.handleDragDrop }
        onChange={ this.handleChange }
        onClick={ this.handleClick }
        onClose={ closeModal }
        onSelected={ this.handleSelected }
        onSelectedItem={ this.handleSelectItem }
        onRemoveItem={ this.handleRemoveItem }
        onOpenLightbox={ this.handleOpenLightbox }
        isSelected={ selected }
        isSelectedItem={ selectedItem }
        islightboxOpen={ lightboxIsOpen }
        isSelectedIndex={ selectedIndex }
        isImages={ images }
        isLoading={ isLoading }
        inputRef={ this.fileInput }
      />
    )
  }
}

const mapStateToProps = ({ gallery, map }) => {
  return {
    data: gallery.photos,
    isLoading: gallery.loading,
    map
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPhotosGallery: (id, files) => dispatch(setGalleryPhoto(id, files)),
    deleteDataItem: (id, delitem) => dispatch(deletedData(id, delitem)),
    setCoordinates: cords => dispatch(setGPSCoordinatesOfPhotos(cords)),
    deleteMapCords: id => dispatch(deleteGPSCoordinates(id)),
    closeModal: () => dispatch(modalOppened())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(GalleryContainer);