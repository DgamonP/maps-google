import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';

import config from './config';
import { UserPool } from '../../helpers/amazonCognitoIdentity';
import { notificationService } from './notificationService';

const { axios, responseError } = config;

const register = async (email, nameuser, password) => {
  const attributeList = [];
  // agregar token notificaciones
  let token = await notificationService.getToken();
  const dataName = {
    Name: 'name',
    Value: nameuser,
  };
  const dataType = {
    Name: 'custom:type',
    Value: 'Operator',
  };
  const dataToken = {
    Name: 'custom:token',
    Value: token,
  };
  const attributeName = new CognitoUserAttribute(dataName);
  const attributeType = new CognitoUserAttribute(dataType);
  const attributeToken = new CognitoUserAttribute(dataToken);
  attributeList.push(attributeName);
  attributeList.push(attributeType);
  attributeList.push(attributeToken);
  return new Promise(function (resolve, reject) {
    UserPool.signUp(email, password, attributeList, null, (error, data) => {
      if (error) {
        console.log('error register', error);
        const theError = { errorCode: error.code, errorMessage: error.message };
        reject(theError);
      } else {
        console.log('success register', data);
        resolve(data);
      }
    });
  });
};

const login = (email, password) => {
  const userTemp = new CognitoUser({ Username: email, Pool: UserPool });
  const authDetails = new AuthenticationDetails({ Username: email, Password: password });
  return new Promise(function (resolve, reject) {
    return userTemp.authenticateUser(authDetails, {
      onSuccess: (data) => {
        resolve({ cognitoUserSession: data, newPasswordRequired: false });
      },
      onFailure: (error) => {
        reject(error);
      },
      newPasswordRequired: (userAttributes) => {
        delete userAttributes.email_verified;
        delete userAttributes.phone_number_verified;
        resolve({ cognitoUserSession: userTemp, newPasswordRequired: true });
      },
    });
  });
};

const completeNewPassword = (email, newPassword, cognitoUser) => {
  return new Promise(function (resolve, reject) {
    cognitoUser.completeNewPasswordChallenge(
      newPassword,
      {
        /* otros atributos */
      },
      {
        onSuccess: (data) => {
          resolve(data);
        },
        onFailure: (error) => {
          reject(error);
        },
      }
    );
  });
};

const getSession = (cognitoUser) => {
  if (cognitoUser) {
    return new Promise(function (resolve, reject) {
      cognitoUser.getSession(function (error, result) {
        if (error) {
          const theError = { errorCode: error.code, errorMessage: error.message };
          reject(theError);
        } else {
          resolve(result);
        }
      });
    });
  }
};

const currentUser = () => {
  return new Promise((resolve, reject) => {
    const cognitoUser = UserPool.getCurrentUser();
    if (cognitoUser !== null) {
      resolve(cognitoUser);
    } else {
      reject({ errorCode: 0, errorMessage: 'error in currentUser' });
    }
  });
};

const logout = () => {
  currentUser().then(
    (cognitoUser) => {
      cognitoUser.signOut();
    },
    (error) => {
      return error;
    }
  );
};

const getUserById = (userId) => {
  return axios
    .get(`https://i7p2hb97i5.execute-api.us-east-1.amazonaws.com/prod/api/users/${userId}`)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

export const authService = {
  register,
  login,
  logout,
  getSession,
  currentUser,
  getUserById,
  completeNewPassword,
};
