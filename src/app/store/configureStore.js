import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

export const configureStore = (initialState = {}) => {
  const middlewares = [thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const storeEnhancer = [middlewareEnhancer];

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(...storeEnhancer)
  );

  return store;
};
