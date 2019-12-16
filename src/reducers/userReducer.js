import * as actionTypes from '../actions/action_types';

const initState  = {
  user: {
    userAvatar: ''
  },
  loading: false
};

const userReducer = (state = initState, action) => {
  switch(action.type) {
    case actionTypes.USER_REQESTED:
      return {
        ...state,
        loading: true
      }
    case actionTypes.USER_REQUEST_DATA:
      return {
        user: {
          userAvatar: action.payload
        },
        loading: false
      }
    default:
      return state;
  }
};

export default userReducer;
