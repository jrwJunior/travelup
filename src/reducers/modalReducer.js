import * as actionTypes from '../actions/action_types';

const initState  = {
  isOpen: false,
};

const modalReducer = (state = initState, action) => {
  switch(action.type) {
    case actionTypes.SHOW_MODAL:
      return {
        isOpen: !state.isOpen
      }
    default:
      return state;
  }
};

export default modalReducer;
