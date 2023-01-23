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
    console.log('getState >> ', getState().UserReducer);
    try {
      ApiService.get(API.getAllAddress + id).then(res => {
        if (res) {
          dispatch({type: types.GETALLADDRESS, payload: res});
        }
      });
    } catch (error) {
      console.log('error in Address', error);
    }
  };
};
