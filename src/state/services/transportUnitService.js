import config from './config';
const { axios, responseError } = config;
const url = 'https://xj1jb3d26i.execute-api.us-east-1.amazonaws.com/prod/api/transportUnit';

const getById = (transportUnitId) => {
  return axios
    .get(`${url}/${transportUnitId}/user/`)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const getSearch = (name) => {
  return axios
    .get(`${url}/search/?plate=${name}`)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

export const transportUnitService = {
  getById,
  getSearch,
};
