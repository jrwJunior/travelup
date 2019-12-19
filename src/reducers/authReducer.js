import * as actionTypes from '../actions/action_types';

const initState  = {
  uid: null,
  isLogined: false,
  loading: false,
  logout: false,
  error: null
};

const authReducer = (state = initState, action) => {
  switch(action.type) {
    case actionTypes.LOGIN_REQUSTED:
      return {
        ...state,
        loading: true,
        logout: false
      }
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        uid: action.payload,
        isLogined: true,
        loading: false
      }
    case actionTypes.LOGIN_ERROR:
      console.log('ERROR')
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case actionTypes.LOGIN_OUT:
      return {
        ...state,
        isLogined: false,
        logout: true
      }
    default:
      return state;
  }
};

export default authReducer;
