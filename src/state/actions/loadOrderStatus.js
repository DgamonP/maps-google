import { loadOrderStatusConstants } from '../constants';
import { loadOrderStatusService } from '../services';

const loadOrderStatesList = () => {
  return (dispatch) => {
    dispatch(request());
    loadOrderStatusService.getAll().then(
      (res) => {
        dispatch(success(res.loadingOrderStatus));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: loadOrderStatusConstants.LIST_REQUEST };
  }
  function success(loadOrderStates) {
    return { type: loadOrderStatusConstants.LIST_SUCCESS, loadOrderStates };
  }
  function failure(error) {
    return { type: loadOrderStatusConstants.LIST_FAILURE, error };
  }
};

export const loadOrderStatus = {
  loadOrderStatesList,
};
