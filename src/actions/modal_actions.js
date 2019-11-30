import * as actionTypes from './action_types';

const showModal = () => dispatch => {
  dispatch({ type: actionTypes.SHOW_MODAL });
}

export {
  showModal
}