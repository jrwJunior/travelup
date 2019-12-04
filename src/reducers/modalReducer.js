import * as actionTypes from '../actions/action_types';

const initState  = {
  isOpen: false,
  modalId: null
};

const modalReducer = (state = initState, action) => {
  switch(action.type) {
    case actionTypes.MODAL_OPENEND:
      return {
        isOpen: !state.isOpen,
        modalId: action.payload
      }
    default:
      return state;
  }
};

export default modalReducer;
