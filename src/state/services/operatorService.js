import config from './config';
const { axios, responseError } = config;

const url = 'https://i7p2hb97i5.execute-api.us-east-1.amazonaws.com/prod/api/users';

const getAll = (userId) => {
  return axios
    .get(`${url}/${userId}/all`)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const getById = (operatorId) => {
  return axios
    .get(`${url}/${operatorId}/operator`)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const register = (data) => {
  return axios
    .post('https://xbj2j1ivqj.execute-api.us-east-1.amazonaws.com/prod/api/users', data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const update = (operatorId, data) => {
  return axios
    .put(`${url}/operator/${operatorId}`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const activateDeactivate = (operatorId, data) => {
  return axios
    .put(`${url}/${operatorId}/operator/enble`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

export const operatorService = {
  getAll,
  register,
  getById,
  update,
  activateDeactivate,
};
