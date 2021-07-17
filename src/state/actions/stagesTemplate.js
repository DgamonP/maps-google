import { stagesTemplateService } from '../services';
import { stagesTemplateConstants } from '../constants';

const load = (data) => ({ type: stagesTemplateConstants.LOAD, data });

const stagesTemplatesList = () => {
  return (dispatch) => {
    dispatch(request());
    stagesTemplateService.getAllByGroup().then(
      (res) => {
        dispatch(success(res.stagesTemplate));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: stagesTemplateConstants.LIST_REQUEST };
  }
  function success(stagesTemplates) {
    return { type: stagesTemplateConstants.LIST_SUCCESS, stagesTemplates };
  }
  function failure(error) {
    return { type: stagesTemplateConstants.LIST_FAILURE, error };
  }
};

const stageTemplateDetails = (stageTemplateId) => {
  return (dispatch) => {
    dispatch(request());
    stagesTemplateService.getByStageTemplateId(stageTemplateId).then(
      (res) => {
        const tasks = res.stagesTemplate.tasks;
        // console.log(tasks, res);
        dispatch(success(res.stagesTemplate, { tasks }));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: stagesTemplateConstants.GETBYID_REQUEST };
  }
  function success(stageTemplate, data) {
    return { type: stagesTemplateConstants.GETBYID_SUCCESS, stageTemplate, data };
  }
  function failure(error) {
    return { type: stagesTemplateConstants.GETBYID_FAILURE, error };
  }
};

const stagesTemplateDetails = (dispatchTypeId, typeServiceId, placeId) => {
  return (dispatch) => {
    dispatch(request());

    stagesTemplateService
      .getByDispatchTypeTypeServicePlace(dispatchTypeId, typeServiceId, placeId)
      .then(
        (res) => {
          dispatch(success(res));
        },
        (error) => {
          dispatch(failure(error));
        }
      );
  };

  function request() {
    return { type: stagesTemplateConstants.GETBYIDS_REQUEST };
  }
  function success(stagesTemplate) {
    return { type: stagesTemplateConstants.GETBYIDS_SUCCESS, stagesTemplate };
  }
  function failure(error) {
    return { type: stagesTemplateConstants.GETBYIDS_FAILURE, error };
  }
};

const stagesTemplateRegister = (dispatchTypeId, typeServiceId, placeId) => {
  return (dispatch) => {
    dispatch(request());
    const data = [
      {
        name: 'Asignada',
        dispatchTypeId,
        typeServiceId,
        placeId,
        order: 1,
      },
      {
        name: 'Carguío',
        dispatchTypeId,
        typeServiceId,
        placeId,
        order: 2,
      },
      {
        name: 'Tránsito',
        dispatchTypeId,
        typeServiceId,
        placeId,
        order: 3,
      },
      {
        name: 'Descarguío',
        dispatchTypeId,
        typeServiceId,
        placeId,
        order: 4,
      },
    ];
    stagesTemplateService.register(data).then(
      (res) => {
        // console.log(res);
        dispatch(success(res));
        if (res.stagesTemplate) {
          const dispatchTypeId = res.stagesTemplate[0].dispatchTypeId;
          const typeServiceId = res.stagesTemplate[0].typeServiceId;
          const placeId = res.stagesTemplate[0].placeId;
          dispatch(stagesTemplateDetails(dispatchTypeId, typeServiceId, placeId));
        }
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: stagesTemplateConstants.REGISTER_REQUEST };
  }
  function success(res) {
    return { type: stagesTemplateConstants.REGISTER_SUCCESS, res };
  }
  function failure(error) {
    return { type: stagesTemplateConstants.REGISTER_FAILURE, error };
  }
};

const stagesTemplateUpdate = (stageTemplateId, data) => {
  return (dispatch) => {
    dispatch(request());
    data.tasks = data.tasks.map((item, index) => {
      item.order = index + 1;
      if (!item.allow) {
        item.allow = {};
        item.allow.operator = false;
        item.allow.carrier = false;
        item.allow.client = false;
      } else {
        if (!item.allow.operator) {
          item.allow.operator = false;
        }
        if (!item.allow.carrier) {
          item.allow.carrier = false;
        }
        if (!item.allow.client) {
          item.allow.client = false;
        }
      }
      if (!item.allowFiles) {
        item.allowFiles = false;
      }
      if (!item.pushNotification) {
        item.pushNotification = false;
      }
      if (!item.validation) {
        item.validation = {};
        item.validation.operator = false;
        item.validation.carrier = false;
        item.validation.client = false;
      } else {
        if (!item.validation.operator) {
          item.validation.operator = false;
        }
        if (!item.validation.carrier) {
          item.validation.carrier = false;
        }
        if (!item.validation.client) {
          item.validation.client = false;
        }
      }
      if (!item.viewCarrier) {
        item.viewCarrier = false;
      }
      if (!item.viewClient) {
        item.viewClient = false;
      }
      item.emailNotification = false;
      item.smsNotification = false;
      return item;
    });
    // console.log(data);
    stagesTemplateService.updateOneStage(stageTemplateId, data).then(
      (res) => {
        dispatch(success(res));
        if (res.stagesTemplate) {
          const dispatchTypeId = res.stagesTemplate.dispatchTypeId;
          const typeServiceId = res.stagesTemplate.typeServiceId;
          const placeId = res.stagesTemplate.placeId;
          dispatch(stagesTemplateDetails(dispatchTypeId, typeServiceId, placeId));
        }
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: stagesTemplateConstants.UPDATE_REQUEST };
  }
  function success(res) {
    return { type: stagesTemplateConstants.UPDATE_SUCCESS, res };
  }
  function failure(error) {
    return { type: stagesTemplateConstants.UPDATE_FAILURE, error };
  }
};

const stagesTemplateActivateDeactivate = (stagesTemplateId, data) => {
  return (dispatch) => {
    dispatch(request());
    stagesTemplateService.activateDeactivate(stagesTemplateId, data).then(
      (res) => {
        // alert(res.message);
        dispatch(success(res));
        dispatch(stagesTemplatesList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: stagesTemplateConstants.ACTIVATE_DEACTIVATE_REQUEST };
  }
  function success(res) {
    return { type: stagesTemplateConstants.ACTIVATE_DEACTIVATE_SUCCESS, res };
  }
  function failure(error) {
    return { type: stagesTemplateConstants.ACTIVATE_DEACTIVATE_FAILURE, error };
  }
};

const stagesTemplateDeleteTask = (stageId, taskId, dispatchTypeId, typeServiceId, placeId) => {
  return (dispatch) => {
    dispatch(request());
    stagesTemplateService.deleteTask(stageId, taskId).then(
      (res) => {
        dispatch(success(res));
        dispatch(stagesTemplateDetails(dispatchTypeId, typeServiceId, placeId));
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: stagesTemplateConstants.DELETE_TASK_REQUEST };
  }
  function success(res) {
    return { type: stagesTemplateConstants.DELETE_TASK_SUCCESS, res };
  }
  function failure(error) {
    return { type: stagesTemplateConstants.DELETE_TASK_FAILURE, error };
  }
};

const stagesTemplatesLoadData = (stagesTemplateId, stagesTemplate) => {
  /* search redux before server */
  return (dispatch) => {
    if (stagesTemplate !== null) {
      let data = { ...stagesTemplate };
      data.currentFeatures = data.features;
      delete data.features;
      delete data.account;
      delete data._id;
      dispatch(success(data));
    } else {
      dispatch(request());
      stagesTemplateService.getById(stagesTemplateId).then(
        (res) => {
          const { stagesTemplate } = res;
          let data = stagesTemplate;
          data.currentFeatures = data.features;
          delete data.features;
          delete data.account;
          delete data._id;
          dispatch(success(data));
        },
        (error) => {
          dispatch(failure(error));
        }
      );
    }
  };

  function request() {
    return { type: stagesTemplateConstants.LOAD_REQUEST };
  }
  function success(data) {
    return { type: stagesTemplateConstants.LOAD_SUCCESS, data };
  }
  function failure(error) {
    return { type: stagesTemplateConstants.LOAD_FAILURE, error };
  }
};

const offSuccess = () => ({
  type: stagesTemplateConstants.OFF_SUCCESS,
});

export const stagesTemplate = {
  load,
  offSuccess,
  stagesTemplatesList,
  stageTemplateDetails,
  stagesTemplateDetails,
  stagesTemplateRegister,
  stagesTemplateUpdate,
  stagesTemplateActivateDeactivate,
  stagesTemplatesLoadData,
  stagesTemplateDeleteTask,
};
