import config from './config';
const { axios, responseError } = config;
const url = 'https://eonp25401g.execute-api.us-east-1.amazonaws.com/prod/api/cities/';

const getAll = () => {
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const getById = (cityId) => {
  return axios
    .get(`${url}${cityId}`)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const register = (data) => {
  return axios
    .post(url, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const update = (cityId, data) => {
  return axios
    .put(`${url}${cityId}`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const activateDeactivate = (cityId, data) => {
  return axios
    .put(`${url}${cityId}/enable`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

export const cityService = {
  getAll,
  getById,
  register,
  update,
  activateDeactivate,
};
