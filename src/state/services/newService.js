import config from './config';
const { axios, responseError } = config;

const url = 'https://2j1v7wivjd.execute-api.us-east-1.amazonaws.com/prod/api/news/';

const getAll = () => {
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const getById = (newId) => {
  return axios
    .get(`${url}${newId}`)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const register = (data) => {
  return axios
    .post(url, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const update = (newId, data) => {
  return axios
    .put(`${url}${newId}`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const activateDeactivate = (newId, data) => {
  return axios
    .put(`${url}${newId}/enable`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

export const newService = {
  getAll,
  register,
  getById,
  update,
  activateDeactivate,
};
