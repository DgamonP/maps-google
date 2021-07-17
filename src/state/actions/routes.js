import { routesConstants } from '../constants';
import { routesService } from '../services';

const routesList = () => {
    return (dispatch) => {
        dispatch(request());
        routesService.getAll().then(
            (routes) => {
                dispatch(success(routes.routes));
            },
            (error) => {
                dispatch(failure(error));
            }
        );
    };

    function request() {
        return { type: routesConstants.GETALL_REQUEST };
    }
    function success(routes) {
        return { type: routesConstants.GETALL_SUCCESS, routes };
    }
    function failure(error) {
        return { type: routesConstants.GETALL_FAILURE, error };
    }
};

const routesRegister = (data) => {
    return (dispatch) => {
        dispatch(request());
        routesService.register(data).then(
            (res) => {
                dispatch(success(res));
            },
            (error) => {
                dispatch(failure(error));
            }
        );
    };

    function request() {
        return { type: routesConstants.CREATE_REQUEST };
    }
    function success(res) {
        return { type: routesConstants.CREATE_SUCCESS, res };
    }
    function failure(error) {
        return { type: routesConstants.CREATE_FAILURE, error };
    }
};

const routesUpdate = (routesId, data) => {
    return (dispatch) => {
        dispatch(request());
        routesService.update(routesId, data).then(
            (res) => {
                dispatch(success(res));
                dispatch(routesList());
            },
            (error) => {
                alert(error.errorMessage);
                dispatch(failure(error));
            }
        );
    };

    function request() {
        return { type: routesConstants.UPDATE_REQUEST };
    }
    function success(res) {
        return { type: routesConstants.UPDATE_SUCCESS, res };
    }
    function failure(error) {
        return { type: routesConstants.UPDATE_FAILURE, error };
    }
};

const routesActivateDeactivate = (routesId, data) => {
    return (dispatch) => {
        dispatch(request());
        routesService.activateDeactivate(routesId, data).then(
            (res) => {
                dispatch(success(res));
                dispatch(routesList());
            },
            (error) => {
                alert(error.errorMessage);
                dispatch(failure(error));
            }
        );
    };

    function request() {
        return { type: routesConstants.ACTIVATE_DEACTIVATE_REQUEST };
    }
    function success(res) {
        return { type: routesConstants.ACTIVATE_DEACTIVATE_SUCCESS, res };
    }
    function failure(error) {
        return { type: routesConstants.ACTIVATE_DEACTIVATE_FAILURE, error };
    }
};

const routesSelectOne = (routesId) => {
    return (dispach) => {
        dispach(request(routesId));
    }
    function request(index) {
        return { type: routesConstants.SELECT_ONE_REQUEST, index };
    }
};


export const routesAction = {
    routesList,
    routesRegister,
    routesUpdate,
    routesSelectOne,
    routesActivateDeactivate,
};