import config from './config';
const { axios, responseError } = config;
const url =
  'https://6f7zaap0u0.execute-api.us-east-1.amazonaws.com/prod/api/featuresTransportUnit/';

const getAll = () => {
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const getById = (featureId) => {
  return axios
    .get(`${url}${featureId}`)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const register = (data) => {
  return axios
    .post(url, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const update = (featureId, data) => {
  return axios
    .put(`${url}${featureId}`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const activateDeactivate = (typeServiceId, data) => {
  return axios
    .put(`${url}${typeServiceId}/enable`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

export const featureService = {
  getAll,
  getById,
  register,
  update,
  activateDeactivate,
};
