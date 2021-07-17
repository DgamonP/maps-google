import config from './config';
const { axios, responseError } = config;

const url = 'https://z0esouehbe.execute-api.us-east-1.amazonaws.com/prod/api/benefits/';

const getAll = () => {
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const getById = (benefitId) => {
  return axios
    .get(`${url}${benefitId}`)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const register = (data) => {
  return axios
    .post(url, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const update = (benefitId, data) => {
  return axios
    .put(`${url}${benefitId}`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const activateDeactivate = (benefitId, data) => {
  return axios
    .put(`${url}${benefitId}/enable`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

export const benefitService = {
  getAll,
  register,
  getById,
  update,
  activateDeactivate,
};
