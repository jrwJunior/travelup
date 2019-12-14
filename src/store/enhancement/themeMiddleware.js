import * as actionTypes from '../../actions/action_types';

const middlewareTheme = () => next => action => {
  const local = localStorage;

  switch(action.type) {
    case actionTypes.SET_THEME:
      local.setItem('theme', JSON.stringify({ theme: action.payload }));
      next(action);
      break;
    case actionTypes.GET_THEME:
      const data = JSON.parse(local.getItem('theme'));

      if (data) {
        const { theme } = data;
        next({ type: actionTypes.SET_THEME, payload: theme });
      }
      break;
    default:
      return next(action);
  }
}

export default middlewareTheme;