import config from './config';
const { axios, responseError } = config;

const getById = (userId) => {
  return axios
    .get(`/profile/${userId}`)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const updateProfile = (userId, data) => {
  return axios
    .post(`/updateProfile/${userId}`, data)
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

export const profileService = {
  getById,
  updateProfile,
};
