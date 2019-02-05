import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_END,
  ASYNC_ACTION_ERROR
} from './asyncActions';
import { createReducer } from '../../app/common/utils/reducerUtil';

const initialState = {
  loading: false
};

const asyncActionStart = (state, payload) => {
  return { ...state, loading: true };
};

const asyncActionEnd = (state, payload) => {
  return { ...state, loading: false };
};

const asyncActionError = (state, payload) => {
  return { ...state, loading: false };
};

const mapActionsToReducers = {
  [ASYNC_ACTION_START]: asyncActionStart,
  [ASYNC_ACTION_END]: asyncActionEnd,
  [ASYNC_ACTION_ERROR]: asyncActionError
};

export default createReducer(initialState, mapActionsToReducers);
