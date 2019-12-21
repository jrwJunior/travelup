import * as actionTypes from '../../actions/action_types';

const middlewareAuth = () => next => action => {
  const local = localStorage;

  switch(action.type) {
    case actionTypes.LOGIN_SUCCESS:
      local.setItem('_user', JSON.stringify({ isLogined: true, uid: action.payload }));

      return next(action);
    case actionTypes.LOGIN_OUT:
      local.setItem('_user', JSON.stringify({ isLogined : false }));

      return next(action);
    default:
      return next(action);
  }
}

export default middlewareAuth;