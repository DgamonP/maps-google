import config from './config';
const { axios, responseError } = config;

const getAll = () => {
  return axios
    .get('https://61ocpyckk5.execute-api.us-east-1.amazonaws.com/prod/api/modules/')
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const getById = (moduleId) => {
  return axios
    .get(`/module/${moduleId}`)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const create = (data) => {
  return axios
    .post('/module', data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const update = (moduleId, data) => {
  return axios
    .put(`/module/${moduleId}`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

export const moduleService = {
  getAll,
  getById,
  create,
  update,
};
