import config from './config';
const { axios, responseError } = config;
const url = 'https://pmw02crhi3.execute-api.us-east-1.amazonaws.com/dev/api/stagesTemplate/';

const getAll = () => {
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const getAllByGroup = () => {
  return axios
    .get(url + 'group')
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const getByStageTemplateId = (stageTemplateId) => {
  return axios
    .get(`${url}${stageTemplateId}`)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const getByDispatchTypeTypeServicePlace = (dispatchTypeId, typeServiceId, placeId) => {
  return axios
    .get(`${url}group/dispatchType/${dispatchTypeId}/typeService/${typeServiceId}/place/${placeId}`)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const register = (data) => {
  return axios
    .post(`${url}array`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const updateOneStage = (stageTemplateId, data) => {
  return axios
    .put(`${url}${stageTemplateId}`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const activateDeactivate = (stagesTemplateId, data) => {
  return axios
    .put(`${url}${stagesTemplateId}/enable`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const deleteTask = (stageId, taskId) => {
  return axios
    .put(`${url}${stageId}/task/${taskId}`)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

export const stagesTemplateService = {
  getAll,
  register,
  updateOneStage,
  activateDeactivate,
  getAllByGroup,
  getByStageTemplateId,
  getByDispatchTypeTypeServicePlace,
  deleteTask,
};
