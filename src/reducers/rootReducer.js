import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import userReducer from './userReducer';
import modalReducer from './modalReducer';
import gpsCoordinates from './gpsCoordinatesReducer';
import mapLeafletReducer from './mapleafletReducer';
import cropperReducer from './cropperReducer';
import galleryReducer from './galleryReducer';
import notificationReducer from './notificationReducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  user: userReducer,
  modal: modalReducer,
  cropper: cropperReducer,
  gpsCords: gpsCoordinates,
  map: mapLeafletReducer,
  gallery: galleryReducer,
  notification: notificationReducer,
  fb: firebaseReducer,
});

export default rootReducer;