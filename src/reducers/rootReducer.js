import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import userReducer from './userReducer';
import mapLeafletReducer from './mapleafletReducer';
import cropperReducer from './cropperReducer';
import modalReducer from './modalReducer';
import popperReducer from './popperReducer';
import galleryReducer from './galleryReducer';
import noticeReducer from './noticeReducer';
import themeReducer from './themeReducer';

const rootReducer = combineReducers({
  fb: firebaseReducer,
  form: formReducer,
  auth: authReducer,
  user: userReducer,
  cropper: cropperReducer,
  map: mapLeafletReducer,
  modal: modalReducer,
  popper: popperReducer,
  gallery: galleryReducer,
  notice: noticeReducer,
  theme: themeReducer
});

export default rootReducer;