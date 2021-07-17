import { profileConstants } from '../constants';

const initialState = { loading: false, profile: {}, res: null, data: null };

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case profileConstants.LOAD:
      return {
        ...state,
        data: action.data,
      };
    case profileConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case profileConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.profile,
      };
    case profileConstants.GETBYID_FAILURE:
      return {
        ...state,
        loading: false,
        profile: {},
        error: action.error,
      };
    case profileConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case profileConstants.UPDATE_BEGIN: {
      // actualizar la tienda de forma optimista inmediatamente
      // console.log('UPDATE_BEGIN:', action.payload);
      return {
        ...state,
        loading: false,
        profile: { ...state.profile, auth: action.payload },
      };
    }
    case profileConstants.UPDATE_SUCCESS:
      // console.log('UPDATE_SUCCESS:', action.payload);
      return {
        ...state,
        loading: false,
        profile: { ...state.profile, auth: action.payload },
      };
    case profileConstants.UPDATE_FAILURE:
      /* elimine lo que se actualizó de manera optimista en la tienda si la solicitud falla y
				 guarde el error en la tienda en su lugar */
      // console.log('UPDATE_FAILURE:', action.payload);
      return {
        ...state,
        loading: false,
        // profile?
        error: action.payload,
      };
    default:
      return state;
  }
};
