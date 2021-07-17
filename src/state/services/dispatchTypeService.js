import config from './config';
const { axios, responseError } = config;
const url = 'https://fgo33n3qzd.execute-api.us-east-1.amazonaws.com/prod/api/dispatchType/';

const getAll = () => {
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const getById = (dispatchTypeId) => {
  return axios
    .get(`${url}${dispatchTypeId}`)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const register = (data) => {
  return axios
    .post(url, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const update = (dispatchTypeId, data) => {
  return axios
    .put(`${url}${dispatchTypeId}`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const activateDeactivate = (dispatchTypeId, data) => {
  return axios
    .put(`${url}${dispatchTypeId}/enable`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

export const dispatchTypeService = {
  getAll,
  getById,
  register,
  update,
  activateDeactivate,
};
