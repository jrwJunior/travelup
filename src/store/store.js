import { createStore, applyMiddleware, compose } from 'redux';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import thunkMiddleware from 'redux-thunk';
import themeMiddleware from './enhancement/themeMiddleware';
import authMiddleware from './enhancement/authMiddleware';
import rootReducer from '../reducers/rootReducer';
import fbConfig from '../fb/firebase';

const configureStore = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(
      thunkMiddleware.withExtraArgument({ getFirebase, getFirestore }),
      authMiddleware,
      themeMiddleware
      ),
      reactReduxFirebase(fbConfig),
      reduxFirestore(fbConfig)
  ));

  return store;
}

export default configureStore;
