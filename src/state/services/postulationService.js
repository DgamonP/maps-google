import config from './config';
const { axios, responseError } = config;

const getAll = (travelId) => {
  return axios
    .get(
      `https://agt9sb1rj0.execute-api.us-east-1.amazonaws.com/dev/api/postulation/travel/${travelId}`
    )
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const accept = (postulationId) => {
  return axios
    .put(
      `https://agt9sb1rj0.execute-api.us-east-1.amazonaws.com/dev/api/postulation/accept/${postulationId}`
    )
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

const getConfirmed = (travelId) => {
  return axios
    .get(
      `https://agt9sb1rj0.execute-api.us-east-1.amazonaws.com/dev/api/postulation/confirmed/travel/${travelId}`
    )
    .then((res) => res.data)
    .catch((error) => responseError(error));
};

export const postulationService = {
  getAll,
  accept,
  getConfirmed,
};
