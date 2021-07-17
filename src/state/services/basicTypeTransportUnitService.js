import config from './config';
const { axios, responseError } = config;
const url = 'https://qfvy35ds60.execute-api.us-east-1.amazonaws.com/prod/api/basicTransportUnit/';

const getAll = () => {
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const getById = (basicTypeTransportUnitId) => {
  return axios
    .get(`${url}${basicTypeTransportUnitId}`)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const register = (data) => {
  return axios
    .post(url, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const update = (basicTypeTransportUnitId, data) => {
  return axios
    .put(`${url}${basicTypeTransportUnitId}`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const activateDeactivate = (basicTypeTransportUnitId, data) => {
  return axios
    .put(`${url}${basicTypeTransportUnitId}/enable`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

export const basicTypeTransportUnitService = {
  getAll,
  getById,
  register,
  update,
  activateDeactivate,
};
