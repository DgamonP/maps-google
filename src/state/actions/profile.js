import { profileConstants } from '../constants';
import { profileService } from '../services';

const load = (data) => ({ type: profileConstants.LOAD, data });

const profileById = (profileId) => {
  return (dispatch) => {
    dispatch(request());
    profileService.getById(profileId).then(
      ({ profile }) => {
        //console.log('profileById', profile);
        dispatch(success(profile));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: profileConstants.GETBYID_REQUEST };
  }
  function success(profile) {
    return { type: profileConstants.GETBYID_SUCCESS, profile };
  }
  function failure(error) {
    return { type: profileConstants.GETBYID_FAILURE, error };
  }
};

const profileUpdate = (profileId, data) => {
  return (dispatch) => {
    console.log('profileUpdate(), dispatch GET_RAICHU');
    dispatch({
      //el middleware lo toma desde aquí, creamos un archivo que reciba esta acción
      type: profileConstants.UPDATE,
      profileId,
      data,
    });
  };
};

export const profile = {
  load,
  profileById,
  profileUpdate,
};
