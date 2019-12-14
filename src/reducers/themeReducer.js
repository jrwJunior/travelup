import * as actionTypes from '../actions/action_types';

const initState  = {
  colorTheme: null
};

const themeReducer = (state = initState, action) => {
  switch(action.type) {
    case actionTypes.SET_THEME:
      return {
        colorTheme: action.payload
      }
    default:
      return state;
  }
};

export default themeReducer;
