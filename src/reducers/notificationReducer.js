import * as actionTypes from '../actions/action_types';

const initState  = {
  notifi: false,
  message: null
};

const notificationReducer = (state = initState, action) => {
  switch(action.type) {
    case actionTypes.SET_NOTIFICATION:
      return {
        notifi: action.payload.notifi,
        message: action.payload.message
      }
    default:
      return state;
  }
};

export default notificationReducer;
