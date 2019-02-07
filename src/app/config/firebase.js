import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDHLz8gPMiOrpjdbl9B5fQkDqzHR-e3D0k',
  authDomain: 'revents-a8e64.firebaseapp.com',
  databaseURL: 'https://revents-a8e64.firebaseio.com',
  projectId: 'revents-a8e64',
  storageBucket: 'revents-a8e64.appspot.com',
  messagingSenderId: '494161473699'
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
