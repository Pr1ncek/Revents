import { closeModal } from '../modals/modalActions';

export const authConstants = {
  LOGIN_USER: 'LOGIN_USER',
  SIGNOUT_USER: 'SIGNOUT_USER',
  REGISTER_USER: 'REGISTER_USER'
};

export const login = credentials => {
  return dispatch => {
    dispatch({ type: authConstants.LOGIN_USER, payload: { credentials } });
    dispatch(closeModal());
  };
};

export const signout = () => {
  return { type: authConstants.SIGNOUT_USER };
};
