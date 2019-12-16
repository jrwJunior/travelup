import * as actionTypes from '../../actions/action_types';

const middlewareAuth = () => next => action => {
  const local = localStorage;

  switch(action.type) {
    case actionTypes.LOGIN_SUCCESS:
      local.setItem('_user', JSON.stringify({ isLogined: true, uid: action.payload }));
      next(action);
      break;
    case actionTypes.LOGIN_OUT:
      local.setItem('_user', JSON.stringify({ isLogined : false, uid: null }));
      next({ type: actionTypes.LOGIN_OUT });
      break;
    default:
      return next(action);
  }
}

export default middlewareAuth;