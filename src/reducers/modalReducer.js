import * as actionTypes from '../actions/action_types';

const initState  = {
  isOpen: false,
  id: null,
  body: null
};

const modalReducer = (state = initState, action) => {
  switch(action.type) {
    case actionTypes.MODAL_WINDOW:
      const { id, body } = action.payload;
      
      return {
        isOpen: !state.isOpen,
        id,
        body
      }
    default:
      return state;
  }
};

export default modalReducer;
