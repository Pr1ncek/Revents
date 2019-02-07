import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

import firebase from '../config/firebase';
// prettier-ignore
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFireStore } from 'redux-firestore';

const rrfConfig = {
  userProfile: 'users',
  attachAuthIsReady: true,
  useFirestoreForProfile: true
};

export const configureStore = (initialState = {}) => {
  const middlewares = [thunk.withExtraArgument({ getFirebase, getFireStore })];
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
