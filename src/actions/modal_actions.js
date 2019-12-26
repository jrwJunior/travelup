import * as actionTypes from './action_types';

const modalOppened = (id, body) => dispatch => {
  dispatch({ type: actionTypes.MODAL_WINDOW, payload:{
    id,
    body
  }});
}

export {
  modalOppened
}