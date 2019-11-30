import * as actionTypes from '../actions/action_types';

const initState  = {
  zoom: 1,
  photo: null
};

const cropperReducer = (state = initState, action) => {
  switch(action.type) {
    case actionTypes.CROPPER_ADD_PHOTO:
      return {
        ...state,
        photo: action.payload
      }
    case actionTypes.CROPPER_ZOOM_PHOTO:
      return {
        ...state,
        zoom: action.payload
      }
    default:
      return state;
  }
};

export default cropperReducer;
