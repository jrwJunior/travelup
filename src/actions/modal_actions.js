import * as actionTypes from './action_types';

const modalOppened = id => dispatch => {
  dispatch({ type: actionTypes.MODAL_OPENEND, payload: id });
}

export {
  modalOppened
}