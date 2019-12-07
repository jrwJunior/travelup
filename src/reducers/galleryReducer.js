import * as actionTypes from '../actions/action_types';

const initState  = {};

const galleryReducer = (state = initState, action) => {
  switch(action.type) {
    case actionTypes.SET_PHOTO_GALLERY:
      return {
        ...state,
        ...action.payload
      }
    case actionTypes.REMOVE_ITEM_GALLERY:
      return {
        ...action.payload
      }
    default:
      return state;
  }
};

export default galleryReducer;
