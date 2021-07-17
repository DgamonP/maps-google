import config from './config';
const { axios, responseError } = config;
const url = 'https://jjckpz2p24.execute-api.us-east-1.amazonaws.com/dev/api/boardingMode/';

const getAll = () => {
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const getById = (boardingModeId) => {
  return axios
    .get(`${url}${boardingModeId}`)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const register = (data) => {
  return axios
    .post(url, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const update = (boardingModeId, data) => {
  return axios
    .put(`${url}${boardingModeId}`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const activateDeactivate = (boardingModeId, data) => {
  return axios
    .put(`${url}${boardingModeId}/enable`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

export const boardingModeService = {
  getAll,
  getById,
  register,
  update,
  activateDeactivate,
};
