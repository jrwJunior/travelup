import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import userReducer from './userReducer';
import mapLeafletReducer from './mapleafletReducer';
import cropperReducer from './cropperReducer';
import modalReducer from './modalReducer';
import galleryReducer from './galleryReducer';
import notificationReducer from './notificationReducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  user: userReducer,
  cropper: cropperReducer,
  map: mapLeafletReducer,
  modal: modalReducer,
  gallery: galleryReducer,
  notification: notificationReducer,
  fb: firebaseReducer,
});

export default rootReducer;