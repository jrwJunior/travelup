import * as actionTypes from './action_types';

const setCropPhoto = url => dispatch => {
  dispatch({ type: actionTypes.CROPPER_ADD_PHOTO, payload: url });
}

const setCropZoomPhoto = zoom => dispatch => {
  dispatch({ type: actionTypes.CROPPER_ZOOM_PHOTO, payload: zoom });
}

export {
  setCropPhoto,
  setCropZoomPhoto
}