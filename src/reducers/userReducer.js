import * as actionTypes from '../actions/action_types';

const initState  = {
  currentUser: {
    userAvatar: ''
  },
  loading: false
};

const userReducer = (state = initState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_REQUEST_DATA:
      return {
        ...state,
        loading: true
      }
    case actionTypes.FETCH_REQUEST_USER_DATA:
      return {
        currentUser: {
          ...state.currentUser,
          ...action.payload
        },
        loading: false
      }
    case actionTypes.UPDATE_USER_PHOTO:
      return {
        currentUser: {
          userAvatar: action.payload
        },
        loading: false
      }
    default:
      return state;
  }
};

export default userReducer;
