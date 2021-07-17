import { categoryConstants } from '../constants';
import { categoryService } from '../services';
import { reset } from 'redux-form';

const load = (data) => ({ type: categoryConstants.LOAD, data });

const categoriesList = () => {
  return (dispatch) => {
    dispatch(request());
    categoryService.getAll().then(
      (res) => {
        dispatch(success(res.categories));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: categoryConstants.LIST_REQUEST };
  }
  function success(categories) {
    return { type: categoryConstants.LIST_SUCCESS, categories };
  }
  function failure(error) {
    return { type: categoryConstants.LIST_FAILURE, error };
  }
};

const categoryDetails = (categoryId, categories) => {
  return (dispatch) => {
    if (categories.length !== 0) {
      const result = categories.filter((category) => category._id === categoryId);
      dispatch(success(result[0]));
      dispatch(load(result[0]));
    } else {
      dispatch(request());
      categoryService.getById(categoryId).then(
        (res) => {
          dispatch(success(res.category));
          dispatch(load(res.category));
        },
        (error) => {
          dispatch(failure(error));
        }
      );
    }
  };

  function request() {
    return { type: categoryConstants.GETBYID_REQUEST };
  }
  function success(category) {
    return { type: categoryConstants.GETBYID_SUCCESS, category };
  }
  function failure(error) {
    return { type: categoryConstants.GETBYID_FAILURE, error };
  }
};

const categoryRegister = (data) => {
  return (dispatch) => {
    dispatch(request());
    categoryService.register(data).then(
      (res) => {
        dispatch(success(res));
        dispatch(reset('FormGeneric'));
        dispatch(categoriesList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: categoryConstants.REGISTER_REQUEST };
  }
  function success(res) {
    return { type: categoryConstants.REGISTER_SUCCESS, res };
  }
  function failure(error) {
    return { type: categoryConstants.REGISTER_FAILURE, error };
  }
};

const categoryUpdate = (categoryId, data) => {
  return (dispatch) => {
    dispatch(request());
    categoryService.update(categoryId, data).then(
      (res) => {
        // alert(res.message);
        dispatch(success(res));
        dispatch(categoriesList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: categoryConstants.UPDATE_REQUEST };
  }
  function success(res) {
    return { type: categoryConstants.UPDATE_SUCCESS, res };
  }
  function failure(error) {
    return { type: categoryConstants.UPDATE_FAILURE, error };
  }
};

const categoryActivateDeactivate = (categoryId, data) => {
  return (dispatch) => {
    dispatch(request());
    categoryService.activateDeactivate(categoryId, data).then(
      (res) => {
        // alert(res.message);
        dispatch(success(res));
        dispatch(categoriesList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: categoryConstants.ACTIVATE_DEACTIVATE_REQUEST };
  }
  function success(res) {
    return { type: categoryConstants.ACTIVATE_DEACTIVATE_SUCCESS, res };
  }
  function failure(error) {
    return { type: categoryConstants.ACTIVATE_DEACTIVATE_FAILURE, error };
  }
};

const offSuccess = () => ({
  type: categoryConstants.OFF_SUCCESS,
});

export const category = {
  load,
  offSuccess,
  categoriesList,
  categoryDetails,
  categoryRegister,
  categoryUpdate,
  categoryActivateDeactivate,
};
