import config from './config';
const { axios, responseError } = config;
const url = 'https://xirj629oxh.execute-api.us-east-1.amazonaws.com/prod/api';

const register = (dispatchTypeId, typeServiceId, placeId, data) => {
  return axios
    .post(
      `${url}/dispatchType/${dispatchTypeId}/typeService/${typeServiceId}/place/${placeId}/stages/`,
      data
    )
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const getTaskByIds = (taskId, stageId) => {
  return axios
    .get(`${url}/task/stages/${stageId}/tasks/${taskId}`)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const approveTask = (taskId, stageId, data) => {
  const newData = { action: data };
  return axios
    .put(`${url}/validate/stages/${stageId}/tasks/${taskId}`, newData)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

export const stageService = {
  register,
  getTaskByIds,
  approveTask,
};
