import { authConstants } from './authActions';
import { createReducer } from '../../app/common/utils/reducerUtil';

const initialState = {
  currentUser: {},
  authenticated: false
};

const login = (state, payload) => {
  return {
    ...state,
    authenticated: true,
    currentUser: payload.credentials.email
  };
};

const signout = (state, payload) => {
  return {
    ...state,
    authenticated: false,
    currentUser: {}
  };
};

const mapActionsToReducers = {
  [authConstants.LOGIN_USER]: login,
  [authConstants.SIGNOUT_USER]: signout
};

export default createReducer(initialState, mapActionsToReducers);
