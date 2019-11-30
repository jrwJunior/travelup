import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setGPSCoordinates } from '../../actions/gps_actions';
import { setGalleryPhotos } from '../../actions/gallery_actions';
import EXIF from 'exif-js';
import ServiceGeoocoder from '../../services/service_geocoder';
import UploadFile from './upload_file_view';

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

  getGPSCoordinates(coordinates) {
    return coordinates[0].numerator + coordinates[1].numerator / (60 * coordinates[1].denominator) + coordinates[2].numerator / (3600 * coordinates[2].denominator);
  }

  getFile(file) {
    const { setCoordinates, uid, setPhotosStorage } = this.props;

    EXIF.getData(file, () => {
      const gpsTags = ['GPSLatitude', 'GPSLongitude'];
      const coordinates = {};

      gpsTags.forEach(value => {
        const cord = this.getGPSCoordinates(EXIF.getTag(file, value));
        coordinates[value] = cord;
      });
      this.serviceGeoocoder.getData(coordinates)
        .then(cords => {
          setCoordinates(uid, cords);
          setPhotosStorage(uid, file, cords.id);
        });
    });
  }

  render() {
    return (
      <UploadFile
        onChange={ this.handleChange }
        onClick={ this.handleClick }
        fileInput={ this.fileInput }
      />
    )
  }
}

const mapStateToProps = ({ fb }) => {
  return {
    uid: fb.auth.uid
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCoordinates: (uid, cords) => dispatch(setGPSCoordinates(uid, cords)),
    setPhotosStorage: (uid, file, id) => dispatch(setGalleryPhotos(uid, file, id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(UploadFileContainer);