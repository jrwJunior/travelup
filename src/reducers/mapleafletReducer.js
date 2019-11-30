import * as actionTypes from '../actions/action_types';

const initState  = {
  lat: 55,
  lng: 10,
  marks: [],
  id: null
};

const mapLeafletReducer = (state = initState, action) => {
  switch(action.type) {
    case actionTypes.SET_MAP_COORDINATES:
      return {
        ...state,
        marks: [
          ...state.marks,
          action.payload
        ]
      }
    case actionTypes.SET_COUNT_MAP_ID:
      return {
        ...state,
        id: action.payload
      }
    default:
      return state;
  }
};

export default mapLeafletReducer;
