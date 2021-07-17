import { moduleConstants } from '../constants';
import { moduleService } from '../services';

const modulesList = () => {
  return (dispatch) => {
    dispatch(request());
    moduleService.getAll().then(
      ({ modules }) => {
        dispatch(success(modules));
      },
      (error) => {
        console.log(error);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: moduleConstants.LIST_REQUEST };
  }
  function success(modules) {
    return { type: moduleConstants.LIST_SUCCESS, modules };
  }
  function failure(error) {
    return { type: moduleConstants.LIST_FAILURE, error };
  }
};

export const moduleAction = {
  modulesList,
};
