import * as actionTypes from '../actions/action_types';

const initState  = {
  photos: {},
  loading: false
};

const galleryReducer = (state = initState, action) => {
  switch(action.type) {
    case actionTypes.GALLERY_FETCH_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case actionTypes.SET_PHOTO_GALLERY:
      return {
        photos: {
          ...state.photos,
          ...action.payload
        },
        loading: false
      }
    case actionTypes.REMOVE_ITEM_GALLERY:
      return {
        photos: action.payload,
        loading: false
      }
    default:
      return state;
  }
};

export default galleryReducer;
