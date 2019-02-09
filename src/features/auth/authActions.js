import { closeModal } from '../modals/modalActions';
import { asyncActionStart, asyncActionEnd } from '../async/asyncActions';
import { SubmissionError } from 'redux-form';

export const authConstants = {
  LOGIN_USER: 'LOGIN_USER',
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

export const registerUser = user => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();

  try {
    dispatch(asyncActionStart());
    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password);

    await createdUser.user.updateProfile({
      displayName: user.displayName
    });

    let newUser = {
      uid: firebase.auth().currentUser.uid,
      displayName: user.displayName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    await firebase
      .firestore()
      .collection('users')
      .doc(newUser.uid)
      .set(newUser);
      
    dispatch(closeModal());
  } catch (error) {
    console.log(error);
    throw new SubmissionError({ _error: error.message });
  } finally {
    dispatch(asyncActionEnd());
  }
};
