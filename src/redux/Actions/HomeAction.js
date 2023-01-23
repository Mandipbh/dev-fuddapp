import ApiService, {API} from '../../utils/ApiService';
import {GETAllCATEGORY} from './ActionsTypes';

export const getAllCategory = () => {
  return async dispatch => {
    try {
      ApiService.get(API.getAllCategory).then(res => {
        if (res) {
          dispatch({type: GETAllCATEGORY, payload: res});
        }
      });
    } catch (error) {
      console.log('error in category', error);
    }
  };
};
