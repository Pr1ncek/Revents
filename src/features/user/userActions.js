import moment from 'moment';
import { asyncActionStart, asyncActionEnd } from '../async/asyncActions';
import { toastr } from 'react-redux-toastr';

export const updateProfile = profile => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const { isLoaded, isEmpty, ...updatedProfile } = profile;
  if (updatedProfile.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
    updatedProfile.dateOfBirth = moment(updatedProfile.dateOfBirth).toDate();
  }

  try {
    dispatch(asyncActionStart());
    await firebase.updateProfile(updatedProfile);
    toastr.success('Profile has been updated');
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(asyncActionEnd());
  }
};
