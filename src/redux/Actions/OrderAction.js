import ApiService, {API} from '../../utils/ApiService';
import {ALLORDERS} from './ActionsTypes';

export const getAllOrders = payload => {
  return async dispatch => {
    try {
      ApiService.get(API.getAllOrders + payload)
        .then(res => {
          if (res) {
            dispatch({type: ALLORDERS, payload: res});
          }
        })
        .catch(c => {
          console.log('catch of category >> ', c);
        });
    } catch (error) {
      console.log('error in category', error);
    }
  };
};


