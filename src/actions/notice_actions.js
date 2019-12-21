import * as actionTypes from './action_types';

const setNotice = () => dispatch => {
  dispatch({ type: actionTypes.SET_NOTICE, payload: {
    notice: false
  }});
}

export {
  setNotice
}