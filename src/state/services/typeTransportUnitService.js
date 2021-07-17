import config from './config';
const { axios, responseError } = config;
const url = 'https://ebrkx8jkga.execute-api.us-east-1.amazonaws.com/prod/api/typeTransportUnit/';

const getAll = () => {
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const getById = (typeTransportUnitId) => {
  return axios
    .get(`${url}${typeTransportUnitId}`)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const register = (data) => {
  return axios
    .post(url, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const update = (typeTransportUnitId, data) => {
  return axios
    .put(`${url}${typeTransportUnitId}`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const activateDeactivate = (typeTransportUnitId, data) => {
  return axios
    .put(`${url}${typeTransportUnitId}/enable`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

export const typeTransportUnitService = {
  getAll,
  getById,
  register,
  update,
  activateDeactivate,
};
