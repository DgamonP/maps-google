import { taskConstants } from '../constants';
import { taskService } from '../services';
import { reset } from 'redux-form';
import { loadOrder } from './loadOrder';

const load = (data) => ({ type: taskConstants.LOAD, data });

const tasksList = () => {
  return (dispatch) => {
    dispatch(request());
    taskService.getAll().then(
      (tasks) => {
        dispatch(success(tasks.tasks));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: taskConstants.LIST_REQUEST };
  }
  function success(tasks) {
    return { type: taskConstants.LIST_SUCCESS, tasks };
  }
  function failure(error) {
    return { type: taskConstants.LIST_FAILURE, error };
  }
};

/* const taskDetails = (taskId, tasks) => {
  return (dispatch) => {
    if (tasks.length !== 0) {
      const result = tasks.filter((task) => task._id === taskId);
      dispatch(success(result[0]));
      dispatch(load(result[0]));
    } else {
      dispatch(request());
      taskService.getById(taskId).then(
        (res) => {
          dispatch(success(res.tasks));
          dispatch(load(res.tasks));
        },
        (error) => {
          dispatch(failure(error));
        }
      );
    }
  };

  function request() {
    return { type: taskConstants.GETBYID_REQUEST };
  }
  function success(task) {
    return { type: taskConstants.GETBYID_SUCCESS, task };
  }
  function failure(error) {
    return { type: taskConstants.GETBYID_FAILURE, error };
  }
}; */

const taskRegister = (data) => {
  return (dispatch) => {
    dispatch(request());
    taskService.register(data).then(
      (res) => {
        dispatch(success(res));
        dispatch(reset('FormGeneric'));
        dispatch(tasksList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: taskConstants.REGISTER_REQUEST };
  }
  function success(res) {
    return { type: taskConstants.REGISTER_SUCCESS, res };
  }
  function failure(error) {
    return { type: taskConstants.REGISTER_FAILURE, error };
  }
};

const taskUpdate = (taskId, data) => {
  return (dispatch) => {
    dispatch(request());
    taskService.update(taskId, data).then(
      (res) => {
        // alert(res.message);
        dispatch(success(res));
        dispatch(tasksList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: taskConstants.UPDATE_REQUEST };
  }
  function success(res) {
    return { type: taskConstants.UPDATE_SUCCESS, res };
  }
  function failure(error) {
    return { type: taskConstants.UPDATE_FAILURE, error };
  }
};

const taskActivateDeactivate = (taskId, data) => {
  return (dispatch) => {
    dispatch(request());
    taskService.activateDeactivate(taskId, data).then(
      (res) => {
        // alert(res.message);
        dispatch(success(res));
        dispatch(tasksList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: taskConstants.ACTIVATE_DEACTIVATE_REQUEST };
  }
  function success(res) {
    return { type: taskConstants.ACTIVATE_DEACTIVATE_SUCCESS, res };
  }
  function failure(error) {
    return { type: taskConstants.ACTIVATE_DEACTIVATE_FAILURE, error };
  }
};

const offSuccess = () => ({
  type: taskConstants.OFF_SUCCESS,
});

/* para stages de load order */
const taskDetails = (taskId, stageId, tasks) => {
  return (dispatch) => {
    if (tasks.length !== 0) {
      const result = tasks.filter((task) => task.userId === taskId);
      dispatch(success(result[0]));
    } else {
      dispatch(request());
      taskService.getByIdStage(taskId, stageId).then(
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
    return { type: taskConstants.GETBYID_REQUEST };
  }
  function success(task) {
    return { type: taskConstants.GETBYID_SUCCESS, task };
  }
  function failure(error) {
    return { type: taskConstants.GETBYID_FAILURE, error };
  }
};

const taskApprove = (taskId, stageId, data, loadOrderId) => {
  return (dispatch) => {
    dispatch(request());
    taskService.approve(taskId, stageId, data).then(
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
    return { type: taskConstants.APPROVE_REQUEST };
  }
  function success(res) {
    return { type: taskConstants.APPROVE_SUCCESS, res };
  }
  function failure(error) {
    return { type: taskConstants.APPROVE_FAILURE, error };
  }
};

export const task = {
  load,
  tasksList,
  taskDetails,
  taskApprove,
  taskRegister,
  taskUpdate,
  offSuccess,
  taskActivateDeactivate,
};
