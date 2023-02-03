import ApiService, {API} from '../../utils/ApiService';
import * as types from './ActionsTypes';

export const isLogin = payload => {
  return {
    type: types.IS_LOGIN,
    payload,
  };
};

export const userData = payload => {
  return {
    type: types.USER_DETAILS,
    payload,
  };
};

export const getAllAddress = id => {
  return (dispatch, getState) => {
    try {
      ApiService.get(
        API.getAllAddress + getState().UserReducer?.userDetails?.UserId,
      ).then(res => {
        if (res) {
          dispatch({type: types.GETALLADDRESS, payload: res});
        }
      });
    } catch (error) {
      console.log('error in Address', error);
    }
  };
};

export const logout = () => {
  return {
    type: types.LOGOUT,
  };
};
