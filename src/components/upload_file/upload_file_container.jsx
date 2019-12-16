import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setGPSCoordinates } from '../../actions/map_actions';
import { setGalleryPhotos } from '../../actions/gallery_actions';
import { modalOppened } from '../../actions/modal_actions';
import EXIF from 'exif-js';
import ServiceGeoocoder from '../../services/service_geocoder';
import UploadFile from './upload_file';

class UploadFileContainer extends Component {
  fileInput = React.createRef();
  modal_id = 'modal_info';
  serviceGeoocoder = new ServiceGeoocoder();

  handleChange = evt => {
    const files = evt.target.files;

		Array.from(files).forEach(file => this.getFile(file));
	}

  handleClick = () => {
    this.fileInput.current.click();
  };

  handleModalClose = () => {
    this.props.toggleModal();
  }

  getGPSCoordinates(coordinates) {
    return new Promise((res, req) => {
      if (coordinates) {
        const b = coordinates[0].numerator + coordinates[1].numerator / (60 * coordinates[1].denominator) + coordinates[2].numerator / (3600 * coordinates[2].denominator);
        res(b);
      } else {
        req();
      }
    });
  }

  getFile(file) {
    const { setCoordinates, uid, setPhotosStorage } = this.props;

    EXIF.getData(file, () => {
      Promise.all([
        this.getGPSCoordinates(EXIF.getTag(file, 'GPSLatitude')),
        this.getGPSCoordinates(EXIF.getTag(file, 'GPSLongitude'))
      ])
      .then(data => {
        this.serviceGeoocoder.getData(data)
        .then(cords => {
          setCoordinates(uid, cords);
          setPhotosStorage(uid, file, cords.id);
        })
      }, () => console.log('err'))
    });
  }

  render() {
    const { loading, isEmpty } = this.props;

    return (
      <>
        <UploadFile
          onChange={ this.handleChange }
          onClick={ this.handleClick }
          isLoading={ loading }
          isEmpty={ isEmpty }
          fileInput={ this.fileInput }
        />
      </>
    )
  }
}

const mapStateToProps = ({ user, map, modal }) => {
  return {
    isEmpty: user.loading,
    loading: map.loading,
    modal
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCoordinates: cords => dispatch(setGPSCoordinates(cords)),
    setPhotosStorage: (file, id) => dispatch(setGalleryPhotos(file, id)),
    toggleModal: (id) => dispatch(modalOppened(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(UploadFileContainer);