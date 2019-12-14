import { createStore, applyMiddleware, compose } from 'redux';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import thunkMiddleware from 'redux-thunk';
import themeMiddleware from './enhancement/themeMiddleware';
import rootReducer from '../reducers/rootReducer';
import fbConfig from '../fb/firebase';

const configureStore = () => {
  const store = createStore(rootReducer, compose(
    applyMiddleware(
      thunkMiddleware.withExtraArgument({ getFirebase, getFirestore }),
      themeMiddleware
      ),
      reactReduxFirebase(fbConfig),
      reduxFirestore(fbConfig),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ));

  return store;
}

export default configureStore;
