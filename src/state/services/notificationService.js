import config from './config';
import firebase from '../../helpers/firebase';

const { axios, responseError } = config;

const getToken = () => {
  /* se genera un error al momento de quitar y volver a dar el permiso de notificacion,
    no afecta pero ese es la causa */
  return new Promise((resolve, reject) => {
    const messaging = firebase.messaging();
    messaging
      .getToken({
        vapidKey:
          'BEYtxblKs64iU3oHZtHxq8bE58WpfNJz4oTv2PFhv7zmWE_i6yJ65h2P3xe_LVCb_wrJ0fe7vAHFSU2_HQoVq5A',
      })
      .then((currentToken) => {
        // console.log('token ==> ', currentToken);
        resolve(currentToken);
      })
      .catch((err) => {
        console.log('Se produjo un error al recuperar el token', err);
        resolve('');
      });
  });
};

const getMessage = () => {
  return new Promise((resolve, reject) => {
    if (firebase.messaging.isSupported()) {
      /* get message when app is active */
      firebase.messaging().onMessage(
        (payload) => {
          resolve(payload);
        },
        (e) => {
          console.log('error getMessage', e);
          // Promise.reject(e)
          reject(e);
        }
      );
    }
  });
};

const pushTokenNotification = async (userId) => {
  const token = await getToken();
  const data = {
    userId: userId,
    pushToken: token,
  };
  return axios
    .post(
      'https://xbj2j1ivqj.execute-api.us-east-1.amazonaws.com/prod/api/users/pushTokenNotification/',
      data
    )
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

export const notificationService = {
  getToken,
  getMessage,
  pushTokenNotification,
};
