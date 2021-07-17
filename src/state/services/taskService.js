import config from './config';
const { axios, responseError } = config;
const url = 'https://i4rwov2lta.execute-api.us-east-1.amazonaws.com/dev/api/task/';

const getAll = () => {
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const getById = (taskId) => {
  return axios
    .get(`${url}${taskId}`)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const register = (data) => {
  return axios
    .post(url, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const update = (taskId, data) => {
  return axios
    .put(`${url}${taskId}`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const activateDeactivate = (taskId, data) => {
  return axios
    .put(`${url}${taskId}/enable`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const approve = (taskId, stageId, data) => {
  const urlT = 'https://xirj629oxh.execute-api.us-east-1.amazonaws.com/prod/api/validate/stages/';
  const newData = { action: data };
  return axios
    .put(`${urlT}${stageId}/tasks/${taskId}`, newData)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const getByIdStage = (taskId, stageId) => {
  const urlT = 'https://xirj629oxh.execute-api.us-east-1.amazonaws.com/prod/api/task/stages/';
  return axios
    .get(`${urlT}${stageId}/tasks/${taskId}`)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

export const taskService = {
  getAll,
  getById,
  activateDeactivate,
  approve,
  register,
  update,
  getByIdStage,
};
