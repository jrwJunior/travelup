import * as actionTypes from '../../actions/action_types';

const middlewareTheme = ({ getState }) => next => action => {
  const state = getState();
  const local = localStorage;

  switch(action.type) {
    case actionTypes.SET_THEME:
      local.setItem('theme', JSON.stringify({ theme: action.payload }));
      return next(action);
    case actionTypes.GET_THEME:
      const data = JSON.parse(local.getItem('theme'));

      if (data) {
        const { theme } = data;
        next({ type: actionTypes.SET_THEME, payload: theme });
      }
      break;
    case actionTypes.LOGIN_SUCCESS:
      const user = JSON.parse(local.getItem('_user'));

      if (user.uid !== state.auth.uid) {
        local.setItem('theme', JSON.stringify({ theme: 'light' }));
        next(action);
      }
      break;
    default:
      return next(action);
  }
}

export default middlewareTheme;