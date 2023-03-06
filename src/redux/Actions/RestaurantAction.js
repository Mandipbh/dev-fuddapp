import ApiService, {API} from '../../utils/ApiService';
import {
  GETALLRISTORANTI,
  GETRESTAURANTDETAILS,
  LOADINGRESTORANTI,
  SETCATEGORY,
} from './ActionsTypes';

export const getpopularRestaurants = data => {
  return async dispatch => {
    try {
      dispatch({type: LOADINGRESTORANTI, payload: true});
      const options = {payloads: data};
      console.log('getAllRestaurant payLoad ', data);
      ApiService.post(API.getAllRestaurant, options)
        .then(res => {
          if (res) {
            dispatch({type: GETALLRISTORANTI, payload: res});
            dispatch({type: LOADINGRESTORANTI, payload: false});
          }
        })
        .catch(c => {
          dispatch({type: LOADINGRESTORANTI, payload: false});
          console.log('catch of restaurants  ', c.response.data);
        });
    } catch (error) {
      dispatch({type: LOADINGRESTORANTI, payload: false});
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
          if (res) {
            console.log('res?.RestaurantDetail', res?.RestaurantDetail);
            dispatch({
              type: GETRESTAURANTDETAILS,
              payload: res?.RestaurantDetail,
            });
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

export const setCategory = payload => {
  return {
    type: SETCATEGORY,
    payload,
  };
};
