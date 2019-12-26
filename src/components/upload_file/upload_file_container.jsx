import React, { Component } from 'react';
import { connect } from 'react-redux';
import { failGPSCoordinates } from '../../actions/map_actions';
import { setGPSCoordinatesOfPhotos } from '../../actions/map_actions';
import { modalOppened } from '../../actions/modal_actions';
import EXIF from 'exif-js';
import ServiceGeoocoder from '../../services/service_geocoder';
import UploadFile from './upload_file';

class UploadFileContainer extends Component {
  fileInput = React.createRef();
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
        const resCords = coordinates[0].numerator + coordinates[1].numerator / (60 * coordinates[1].denominator) + coordinates[2].numerator / (3600 * coordinates[2].denominator);
        res(resCords);
      } else {
        req();
      }
    });
  }

  getFile(file) {
    const { setPhotoCoordinates, showModal, setError } = this.props;

    EXIF.getData(file, () => {
      Promise.all([
        this.getGPSCoordinates(EXIF.getTag(file, 'GPSLatitude')),
        this.getGPSCoordinates(EXIF.getTag(file, 'GPSLongitude'))
      ])
      .then(data => {
        this.serviceGeoocoder.getData(data)
        .then(cords => setPhotoCoordinates(file, cords))
      }, 
      () => {
        const message = 'We could not get the geolocation data from your photos, you can add photos manually by selecting a country, and add photos yourself.';

        showModal('error-gps', message);
        setError();
      })
    });
  }

  render() {
    const { loading, isEmpty, errorCords, id } = this.props;

    return (
      <>
        <UploadFile
          onChange={ this.handleChange }
          onClick={ this.handleClick }
          onCloseModal={ this.handleModalClose }
          isLoading={ loading }
          isEmpty={ isEmpty }
          fileInput={ this.fileInput }
          errorCords={ errorCords }
          isOpen={ id === this.modal_id }
        />
      </>
    )
  }
}

const mapStateToProps = ({ user, map, modal }) => {
  return {
    isEmpty: user.loading,
    loading: map.loading,
    errorCords: map.errorCords,
    id: modal.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPhotoCoordinates: (file, cords) => dispatch(setGPSCoordinatesOfPhotos(file, cords)),
    setError: () => dispatch(failGPSCoordinates()),
    showModal: (id, body) => dispatch(modalOppened(id, body))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(UploadFileContainer);