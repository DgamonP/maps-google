import config from './config';
const { axios, responseError } = config;
const url = 'https://g07hlnrvxi.execute-api.us-east-1.amazonaws.com/dev/api/measurementUnit/';

const getAll = () => {
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const getById = (measurementUnitId) => {
  return axios
    .get(`${url}${measurementUnitId}`)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const register = (data) => {
  return axios
    .post(url, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const update = (measurementUnitId, data) => {
  return axios
    .put(`${url}${measurementUnitId}`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const activateDeactivate = (measurementUnitId, data) => {
  return axios
    .put(`${url}${measurementUnitId}/enable`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

export const measurementUnitService = {
  getAll,
  getById,
  register,
  update,
  activateDeactivate,
};
