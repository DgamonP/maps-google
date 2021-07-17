import config from './config';
const { axios, responseError } = config;
const url = 'https://hg2ic73z30.execute-api.us-east-1.amazonaws.com/dev/api/travel';

const getAll = (operationId) => {
  return axios
    .get(`${url}/operation/${operationId}`)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const getById = (loadOrderId) => {
  return axios
    .get(`${url}/${loadOrderId}`)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const register = (data) => {
  return axios
    .post(`${url}/route/`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const publish = (travelId, data) => {
  return axios
    .put(`${url}/publish/${travelId}`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const createLoadingOrder = (travelId, data) => {
  return axios
    .put(`${url}/loadingOrder/${travelId}`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const liquidate = (travelId) => {
  return axios
    .put(`${url}/${travelId}/paid`)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const getCheckpoints = (loadingOrderId, type) => {
  const urlTemp =
    'https://8cl5bvwuxg.execute-api.us-east-1.amazonaws.com/dev/api/checkPoints/loadingOrder';
  return axios
    .get(`${urlTemp}/${loadingOrderId}/type/${type}`)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const createLoadingOrderDirect = (data) => {
  return axios
    .post(`${url}/loadingOrder`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

export const loadOrderService = {
  getAll,
  getById,
  register,
  publish,
  createLoadingOrder,
  liquidate,
  getCheckpoints,
  createLoadingOrderDirect,
};
