import * as actionTypes from '../actions/action_types';

const initState  = {
  cords: []
};

const gpsCoordinatesReducer = (state = initState, action) => {
  switch(action.type) {
    case actionTypes.SET_GPS_COORDINATES:
      return {
        cords: state.cords.concat(...action.payload)
      }
    default:
      return state;
  }
};

export default gpsCoordinatesReducer;
