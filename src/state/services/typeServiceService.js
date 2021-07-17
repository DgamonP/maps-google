import config from './config';
const { axios, responseError } = config;
const url = 'https://30mly2qg72.execute-api.us-east-1.amazonaws.com/prod/api/typeServices/';

const getAll = () => {
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const getById = (typeServiceId) => {
  return axios
    .get(`${url}${typeServiceId}`)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const register = (data) => {
  return axios
    .post(url, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const update = (typeServiceId, data) => {
  return axios
    .put(`${url}${typeServiceId}`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const activateDeactivate = (typeServiceId, data) => {
  return axios
    .put(`${url}${typeServiceId}/enable`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

export const typeServiceService = {
  getAll,
  getById,
  register,
  update,
  activateDeactivate,
};
