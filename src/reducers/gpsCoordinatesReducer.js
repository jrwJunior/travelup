import * as actionTypes from '../actions/action_types';

const initState  = {
  cords: [],
  loading: false
};

const gpsCoordinatesReducer = (state = initState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_REQUEST_COORDINATES:
      return {
        ...state,
        loading: true
      }
    case actionTypes.SET_GPS_COORDINATES:
      return {
        cords: state.cords.concat(...action.payload),
        loading: false
      }
    default:
      return state;
  }
};

export default gpsCoordinatesReducer;
