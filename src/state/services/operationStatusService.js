import config from './config';
const { axios, responseError } = config;

const getAll = () => {
  return axios
    .get('https://n26qengf65.execute-api.us-east-1.amazonaws.com/prod/api/operationStatus/')
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const register = (data) => {
  return axios
    .post('https://n26qengf65.execute-api.us-east-1.amazonaws.com/prod/api/operationStatus/', data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

export const operationStatusService = {
  getAll,
  register,
};
