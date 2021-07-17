import config from './config';
const { axios, responseError } = config;
const url = 'https://a19u2201eb.execute-api.us-east-1.amazonaws.com/dev/api/operation';

const getAll = () => {
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const getById = (operationId) => {
  return axios
    .get(`${url}/${operationId}`)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const register = (data) => {
  return axios
    .post(url, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const update = (operationId, data) => {
  return axios
    .put(`${url}/${operationId}`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const getDashboard = (userId) => {
  return axios
    .get(
      `https://q2vrvto3z8.execute-api.us-east-1.amazonaws.com/prod/api/dashboard/?userId=${userId}`
    )
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

export const operationService = {
  getAll,
  getById,
  register,
  update,
  getDashboard,
};
