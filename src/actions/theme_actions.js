import * as actionTypes from './action_types';

const setTheme = theme => dispatch => {
  dispatch({ type: actionTypes.SET_THEME, payload: theme });
}

const getTheme = () => dispatch => {
  dispatch({ type: actionTypes.GET_THEME });
}

export {
  setTheme,
  getTheme
}