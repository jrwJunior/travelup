import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setGPSCoordinates } from '../../actions/map_actions';
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

        switch(value) {
          case 'GPSLatitude':
            coordinates['lat'] = cord;
            break;
          case 'GPSLongitude':
            coordinates['lon'] = cord;
            break;
          default:
            break;
        }
      });
      this.serviceGeoocoder.getData(coordinates)
        .then(cords => {
          setCoordinates(uid, cords);
          setPhotosStorage(uid, file, cords.id);
        });
    });
  }

  render() {
    const { loading } = this.props;

    return (
      <UploadFile
        onChange={ this.handleChange }
        onClick={ this.handleClick }
        isLoading={ loading }
        fileInput={ this.fileInput }
      />
    )
  }
}

const mapStateToProps = ({ fb, map }) => {
  return {
    uid: fb.auth.uid,
    loading: map.loading
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