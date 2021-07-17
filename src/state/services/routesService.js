import config from './config';
const { axios, responseError } = config;

const url = 'https://cbl3kltwm8.execute-api.us-east-1.amazonaws.com/prod/api/route/';

const getAll = () => {
    return axios
        .get(url)
        .then((res) => res.data)
        .catch((error) => responseError(error));
};

const register = (data) => {
    return axios
        .post(url, data)
        .then((res) => res.data)
        .catch((error) => responseError(error));
};

const update = (newId, data) => {
    return axios
        .put(`${url}${newId}`, data)
        .then((res) => res.data)
        .catch((error) => responseError(error));
};

export const routesService = {
    getAll,
    register,
    update,
};
