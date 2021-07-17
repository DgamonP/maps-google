import config from './config';
const { axios, responseError } = config;
const url = 'https://qwywry9ri8.execute-api.us-east-1.amazonaws.com/prod/api/brand/';

const getAll = () => {
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const getById = (brandId) => {
  return axios
    .get(`${url}${brandId}`)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const register = (data) => {
  return axios
    .post(url, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const update = (brandId, data) => {
  return axios
    .put(`${url}${brandId}`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const activateDeactivate = (brandId, data) => {
  return axios
    .put(`${url}${brandId}/enable`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

export const brandService = {
  getAll,
  getById,
  register,
  update,
  activateDeactivate,
};
