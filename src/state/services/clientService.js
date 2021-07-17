import config from './config';
const { axios, responseError } = config;

const getAll = () => {
  return axios
    .get('https://ztnjxhlsyg.execute-api.us-east-1.amazonaws.com/dev/api/client/')
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const register = (data) => {
  return axios
    .post('https://ztnjxhlsyg.execute-api.us-east-1.amazonaws.com/dev/api/client/', data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

export const clientService = {
  getAll,
  register,
};
