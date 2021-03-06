import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

import firebase from '../config/firebase';
// prettier-ignore
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';

const rrfConfig = {
  userProfile: 'users',
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
  updateProfileOnLogin: false
};

export const configureStore = (initialState = {}) => {
  const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const storeEnhancer = [middlewareEnhancer];

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      ...storeEnhancer,
      reactReduxFirebase(firebase, rrfConfig),
      reduxFirestore(firebase)
    )
  );

  return store;
};
