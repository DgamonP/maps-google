import firebase from 'firebase/app';
import 'firebase/messaging';

const config = {
  apiKey: 'AIzaSyBfVU-LonNcuw1eIUau_3SjWRWGrdHZasQ',
  authDomain: 'deltax-production-v1.firebaseapp.com',
  projectId: 'deltax-production-v1',
  storageBucket: 'deltax-production-v1.appspot.com',
  messagingSenderId: '991618952889',
  appId: '1:991618952889:web:1e1a5ed59c0a938bedb568',
  measurementId: 'G-6E7190G0ZG',
};

firebase.initializeApp(config);
export default firebase;
