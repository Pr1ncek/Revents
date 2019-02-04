import { modalConstants } from './modalActions';
import { createReducer } from '../../app/common/utils/reducerUtil';

const initialState = null;

const openModal = (state, payload) => {
  const { modalType, modalProps } = payload;
  return { modalType, modalProps };
};

const closeModal = (state, payload) => {
  return null;
};

const mapActionsToReducers = {
  [modalConstants.MODAL_OPEN]: openModal,
  [modalConstants.MODAL_CLOSE]: closeModal
};

export default createReducer(initialState, mapActionsToReducers);
