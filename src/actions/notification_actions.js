import * as actionTypes from './action_types';

const setNotification = () => dispatch => {
  dispatch({ type: actionTypes.SET_NOTIFICATION, payload: {
    notifi: false
  }});
}

export {
  setNotification
}