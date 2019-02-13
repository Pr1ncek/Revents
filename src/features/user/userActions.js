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

export const uploadProfileImage = (file, fileName) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const firestore = firebase.firestore();
  const user = firebase.auth().currentUser;
  const path = `${user.uid}/user_images`;
  const options = { name: fileName };

  try {
    // upload file to firebase storage
    let uploadedFile = await firebase.uploadFile(path, file, null, options);
    // get Url of the image
    let downloadUrl = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
    // get userdoc
    const user = await firebase.auth().currentUser;
    await firestore
      .collection('users')
      .doc(user.uid)
      .update({
        photoURL: downloadUrl
      });

    await user.updateProfile({ photoURL: downloadUrl });
    // add new photo to photos collection
    return await firestore
      .collection('users')
      .doc(user.uid)
      .collection('photos')
      .add({
        name: fileName,
        url: downloadUrl
      });
  } catch (error) {
    console.error(error);
    throw new Error('Problem uploading photo');
  }
};
