import config from './config';
const { axios, responseError } = config;

const getAll = () => {
  return axios
    .get('https://lxll8duoy5.execute-api.us-east-1.amazonaws.com/dev/api/loadingOrderStatus/')
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

export const loadOrderStatusService = {
  getAll,
};
