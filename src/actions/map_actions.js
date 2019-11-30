import * as actionTypes from './action_types';

const setMapCoordinates = cords => dispatch => {
  dispatch({ type: actionTypes.SET_MAP_COORDINATES, payload: cords });
}

const setCountryMapId = id => dispatch => {
  dispatch({ type: actionTypes.SET_COUNT_MAP_ID, payload: id });
}

export {
  setMapCoordinates,
  setCountryMapId
}