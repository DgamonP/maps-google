import { routesConstants } from '../constants';

const initialState = { loading: false, routes: [], route: {}, res: null, error: null };

export const routesReducer = (state = initialState, action) => {
    switch (action.type) {
        case routesConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case routesConstants.GETALL_SUCCESS:
            return {
                ...state,
                loading: false,
                routes: action.routes,
            };
        case routesConstants.GETALL_FAILURE:
            return {
                ...state,
                loading: false,
                routes: [],
                error: action.error,
            };
        case routesConstants.CREATE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case routesConstants.CREATE_SUCCESS:
            return {
                ...state,
                loading: false,
                res: action.res,
                error: null
            };
        case routesConstants.CREATE_FAILURE:
            return {
                ...state,
                loading: false,
                res: null,
                error: action.error,
            };
        case routesConstants.UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case routesConstants.UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                res: action.res,
                error: null
            };
        case routesConstants.UPDATE_FAILURE:
            return {
                ...state,
                loading: false,
                res: null,
                error: action.error,
            };
        case routesConstants.SELECT_ONE_REQUEST:
            return {
                ...state,
                route: state.routes[action.index],
            };
        default:
            return state;
    }
};
