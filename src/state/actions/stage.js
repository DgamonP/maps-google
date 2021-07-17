import { stageConstants } from '../constants';
import { stageService } from '../services';
import { loadOrder } from './loadOrder';

const stageRegister = (dispatchTypeId, typeServiceId, placeId, data, travelId) => {
  return (dispatch) => {
    dispatch(request());
    stageService.register(dispatchTypeId, typeServiceId, placeId, data).then(
      (res) => {
        dispatch(success(res));
        dispatch(loadOrder.loadOrderDetails(travelId, []));
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: stageConstants.REGISTER_REQUEST };
  }
  function success(res) {
    return { type: stageConstants.REGISTER_SUCCESS, res };
  }
  function failure(error) {
    return { type: stageConstants.REGISTER_FAILURE, error };
  }
};

const stageTaskDetails = (taskId, stageId, tasks) => {
  return (dispatch) => {
    if (tasks.length !== 0) {
      const result = tasks.filter((task) => task.userId === taskId);
      dispatch(success(result[0]));
    } else {
      dispatch(request());
      stageService.getTaskByIds(taskId, stageId).then(
        ({ task }) => {
          dispatch(success(task));
        },
        (error) => {
          dispatch(failure(error));
        }
      );
    }
  };

  function request() {
    return { type: stageConstants.GETTASK_BYIDS_REQUEST };
  }
  function success(task) {
    return { type: stageConstants.GETTASK_BYIDS_SUCCESS, task };
  }
  function failure(error) {
    return { type: stageConstants.GETTASK_BYIDS_FAILURE, error };
  }
};

const stageTaskApprove = (taskId, stageId, data, loadOrderId) => {
  return (dispatch) => {
    dispatch(request());
    stageService.approveTask(taskId, stageId, data).then(
      (res) => {
        alert(res.message);
        dispatch(success(res));
        dispatch(loadOrder.loadOrderDetails(loadOrderId, []));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: stageConstants.APPROVE_TASK_REQUEST };
  }
  function success(res) {
    return { type: stageConstants.APPROVE_TASK_SUCCESS, res };
  }
  function failure(error) {
    return { type: stageConstants.APPROVE_TASK_FAILURE, error };
  }
};

export const stage = {
  stageRegister,
  stageTaskDetails,
  stageTaskApprove,
};
