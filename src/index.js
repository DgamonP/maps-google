import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import firebase from './helpers/firebase';
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

/* registro de mensajeria en el service worker */
if (firebase.messaging.isSupported()) {
  /* verifica si el navegador soporta la mensajeria */
  if ('serviceWorker' in navigator) {
    console.log('entro a la service worker');
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then((registration) => {
        console.log('registration completed', registration.scope);
      })
      .catch((err) => {
        console.log('Fallo el registrar en el service worker', err);
      });
  }
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.register();

/* const messagingValitation = firebase.messaging;
const messagingTemp = firebase.messaging();
if (messagingValitation.isSupported()) {
  if ('serviceWorker' in navigator) {
    console.log('entro a la service worker');
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then(function (swRegistration) {
        console.log('object', swRegistration.scope);

        Notification.requestPermission()
          .then((result) => {
            console.log(result);
            if (result === 'denied') {
              console.log("Permission wasn't granted. Allow a retry.");
              return;
            } else if (result === 'default') {
              console.log('The permission request was dismissed.');
              return;
            }
            // Hacer algo con el permiso concedido.
            messagingTemp
              .getToken({
                serviceWorkerRegistration: swRegistration,
                vapidKey:
                  'BEYtxblKs64iU3oHZtHxq8bE58WpfNJz4oTv2PFhv7zmWE_i6yJ65h2P3xe_LVCb_wrJ0fe7vAHFSU2_HQoVq5A',
              })
              .then((token) => {
                console.log('token ==> ', token);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log('ERROR ==> ', err);
      });
  }
} */
