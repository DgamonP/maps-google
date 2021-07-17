/* librerias cors y mensajeria */
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyBfVU-LonNcuw1eIUau_3SjWRWGrdHZasQ',
  authDomain: 'deltax-production-v1.firebaseapp.com',
  projectId: 'deltax-production-v1',
  storageBucket: 'deltax-production-v1.appspot.com',
  messagingSenderId: '991618952889',
  appId: '1:991618952889:web:1e1a5ed59c0a938bedb568',
  measurementId: 'G-6E7190G0ZG',
});

const messaging = firebase.messaging();

/* messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    // icon: '/firebase-logo.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
}); */
