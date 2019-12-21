import * as actionTypes from '../actions/action_types';

const initState  = {
  lat: 51.505,
  lng: 0,
  marks: [],
  selectMapId: null,
  loading: false
};

const mapLeafletReducer = (state = initState, action) => {
  switch(action.type) {
    case actionTypes.COORDINATES_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case actionTypes.SET_MAP_COORDINATES:
      return {
        ...state,
        marks: state.marks.concat(action.payload),
        loading: false
      }
    case actionTypes.SET_MAP_ID:
      return {
        ...state,
        selectMapId: action.payload
      }
    case actionTypes.DELETE_MAP_COORDINATES:
      return {
        ...state,
        marks: [
          ...action.payload
        ]
      }
    default:
      return state;
  }
};

export default mapLeafletReducer;
