import ApiService, {API} from '../../utils/ApiService';
import {GETALLEXTERNALRESTAURANT} from './ActionsTypes';

export const getpopularRestaurants = data => {
  return async dispatch => {
    try {
      const options = {payloads: data};
      ApiService.post(API.getAllRestaurant, options)
        .then(res => {
          if (res) {
            dispatch({type: GETALLEXTERNALRESTAURANT, payload: res});
          }
        })
        .catch(c => {
          console.log('catch of restaurants >> ', c.response.data);
        });
    } catch (error) {
      console.log('error in restaurants', error);
    }
  };
};
