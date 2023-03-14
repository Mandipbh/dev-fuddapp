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
          console.log('ressss >>> ', res);
          dispatch({type: types.GETALLADDRESS, payload: res});
        }
      });
    } catch (error) {
      dispatch({type: types.GETALLADDRESS, payload: []});
      console.log('error in Address', error.response);
    }
  };
};

//selected address by user
export const selectedAddress = payload => {
  return {
    type: types.SELECTEDADDRESS,
    payload,
  };
};

export const logout = () => {
  return {
    type: types.LOGOUT,
  };
};
