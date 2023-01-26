import ApiService, {API} from '../../utils/ApiService';
import {GETALLRISTORANTI, GETRESTAURANTDETAILS} from './ActionsTypes';

export const getpopularRestaurants = data => {
  return async dispatch => {
    try {
      const options = {payloads: data};
      ApiService.post(API.getAllRestaurant, options)
        .then(res => {
          console.log('res ??? ', res);
          if (res) {
            dispatch({type: GETALLRISTORANTI, payload: res});
          }
        })
        .catch(c => {
          console.log('catch of restaurants  ', c.response.data);
        });
    } catch (error) {
      console.log('error in restaurants', error);
    }
  };
};

export const restaurantDetails = data => {
  return async dispatch => {
    try {
      const options = {payloads: data};
      ApiService.post(API.getPerticularRestaurant, options)
        .then(res => {
          console.log('restaurantDetails >>. ', res);
          if (res) {
            // dispatch({type: GETRESTAURANTDETAILS, payload: res});
          }
        })
        .catch(c => {
          console.log('catch of restaurants >> ressst ', c.response);
        });
    } catch (error) {
      console.log('error in restaurants', error);
    }
  };
};
