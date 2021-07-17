import axios from 'axios';

const configInterceptor = (token, companyId) => {
  axios.interceptors.request.use(
    (config) => {
      if (!config.params?.companyId) {
        if (companyId) config.params = { companyId };
      }
      // console.log('interceptors', config.params, companyId);
      config.headers.Authorization = 'Bearer ' + token;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      if (response.status === 401) {
        console.log('You are not authorized');
      } else if (response.status === 403) {
        console.log('You do not have permission');
      }
      return response;
    },
    (error) => {
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error.message);
    }
  );
};

/*const {
    error: { error },
  } = e;
  const theError = { errorCode: error.err.code, errorMessage: error.err.message }; 
  return Promise.reject(theError);*/
const responseError = (e) => {
  console.log(e);
  /* controlar con timeout cada 25 segundo volver a preguntar 
    "hubo un error al cargar, volver a cargar" */
  let theError;
  if (e && e.error) {
    const { error } = e;
    if (error.errors) {
      console.log(error);
      theError = { errorCode: '500', errorMessage: error._message }; /* error de mongo */
    } else {
      // console.log('error', error, e);
      /* errores en el servidor */
      theError = { errorCode: '500', errorMessage: e.message };
    }
  } else {
    /* errores en la ruta o ERR_INTERNET_DISCONNECTED */
    theError = { errorCode: 'ERR_FAILED', errorMessage: 'Network Error' };
  }
  return Promise.reject(theError);
};

const config = { configInterceptor, axios, responseError };
export default config;
