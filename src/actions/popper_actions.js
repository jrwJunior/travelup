import * as actionTypes from './action_types';

const popperShow = () => dispatch => {
  dispatch({ type: actionTypes.POPPER_SHOW });
}

export {
  popperShow
}