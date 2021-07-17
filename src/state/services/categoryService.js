import config from './config';
const { axios, responseError } = config;
const url = 'https://1gjaev86xl.execute-api.us-east-1.amazonaws.com/dev/api/category/';

const getAll = () => {
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const getById = (categoryId) => {
  return axios
    .get(`${url}${categoryId}`)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const register = (data) => {
  return axios
    .post(url, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const update = (categoryId, data) => {
  return axios
    .put(`${url}${categoryId}`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const activateDeactivate = (categoryId, data) => {
  return axios
    .put(`${url}${categoryId}/enable`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

export const categoryService = {
  getAll,
  getById,
  register,
  update,
  activateDeactivate,
};
