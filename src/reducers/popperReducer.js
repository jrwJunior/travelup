import * as actionTypes from '../actions/action_types';

const initState  = {
  popperShow: false
};

const popperReducer = (state = initState, action) => {
  switch(action.type) {
    case actionTypes.POPPER_SHOW:
      return {
        popperShow: !state.popperShow
      }
    default:
      return state;
  }
};

export default popperReducer;
