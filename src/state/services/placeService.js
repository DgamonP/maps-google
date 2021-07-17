import config from './config';
const { axios, responseError } = config;

const url = 'https://xf9nsd9m5e.execute-api.us-east-1.amazonaws.com/prod/api/place/';

const getAll = () => {
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const getById = (placeId) => {
  return axios
    .get(`${url}${placeId}`)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const register = (data) => {
  return axios
    .post(url, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const update = (placeId, data) => {
  return axios
    .put(`${url}${placeId}`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const activateDeactivate = (placeId, data) => {
  return axios
    .put(`${url}${placeId}/enable`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

export const placeService = {
  getAll,
  register,
  getById,
  update,
  activateDeactivate,
};
