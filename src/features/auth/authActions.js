import { closeModal } from '../modals/modalActions';
import { asyncActionStart, asyncActionEnd } from '../async/asyncActions';
import { SubmissionError } from 'redux-form';

export const authConstants = {
  LOGIN_USER: 'LOGIN_USER',
  SIGNOUT_USER: 'SIGNOUT_USER',
  REGISTER_USER: 'REGISTER_USER'
};

export const login = ({ email = '', password = '' }) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    try {
      dispatch(asyncActionStart());
      await firebase.auth().signInWithEmailAndPassword(email, password);
      dispatch(closeModal());
    } catch (error) {
      console.log(error);
      throw new SubmissionError({ _error: error.message });
    } finally {
      dispatch(asyncActionEnd());
    }
  };
};

export const signout = () => {
  return { type: authConstants.SIGNOUT_USER };
};
