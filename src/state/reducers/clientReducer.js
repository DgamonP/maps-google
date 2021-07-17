import { clientConstants } from '../constants';

const initialState = { loading: false, clients: [], client: null, res: null, data: null };

export const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case clientConstants.LOAD:
      return {
        ...state,
        data: action.data,
      };
    case clientConstants.LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case clientConstants.LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        clients: action.clients,
      };
    case clientConstants.LIST_FAILURE:
      return {
        ...state,
        loading: false,
        clients: [],
        error: action.error,
      };
    case clientConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case clientConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        res: action.res,
      };
    case clientConstants.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        res: null,
        error: action.error,
      };
    default:
      return state;
  }
};
