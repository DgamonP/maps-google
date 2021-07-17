import config from './config';
const { axios, responseError } = config;

const url = 'https://8lqx2z921e.execute-api.us-east-1.amazonaws.com/prod/api/companyClient/';

const getAll = () => {
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const getById = (companyId) => {
  return axios
    .get(`${url}${companyId}`)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const register = (data) => {
  return axios
    .post(url, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const update = (companyId, data) => {
  return axios
    .put(`${url}${companyId}`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const activateDeactivate = (companyId, data) => {
  return axios
    .put(`${url}${companyId}/enable`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

export const companyService = {
  getAll,
  register,
  getById,
  update,
  activateDeactivate,
};
