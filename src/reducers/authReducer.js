import * as actionTypes from '../actions/action_types';

const initState  = {
  uid: null,
  isLogined: false,
  loading: false
};

const authReducer = (state = initState, action) => {
  switch(action.type) {
    case actionTypes.LOGIN_REQUSTED:
      return {
        ...state,
        loading: true
      }
    case actionTypes.LOGIN_SUCCESS:
      return {
        uid: action.payload,
        isLogined: true,
        loading: false
      }
    case actionTypes.LOGIN_ERROR:
      console.log('ERROR')
      return {
        ...state
      }
    case actionTypes.LOGIN_OUT:
      return {
        ...state,
        isLogined: false,
        loading: false
      }
    default:
      return state;
  }
};

export default authReducer;
