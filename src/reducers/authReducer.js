import * as actionTypes from '../actions/action_types';

const initState  = {
  authorizedUser: false,
  logOut: false,
  authError: {
    signIn: null,
    signIp: null
  }
};

const authReducer = (state = initState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_LOGIN_SUCCESS:
      return {
        ...state,
        authorizedUser: true
      }
    case actionTypes.FETCH_LOGIN_ERROR:
      return {
        ...state,
        authError: {
          ...state.authError,
          ...action.payload
        }
      }
    case actionTypes.FETCH_LOGIN_OUT:
      return {
        ...state,
        logOut: true
      }
    default:
      return state;
  }
};

export default authReducer;
