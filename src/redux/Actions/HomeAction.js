import ApiService, {API} from '../../utils/ApiService';
import {
  GETAllCATEGORY,
  GETALLEXTERNALRESTAURANT,
  GETALLRESTAURANTS,
} from './ActionsTypes';

//get all catregegorys
export const getAllCategory = () => {
  return async dispatch => {
    try {
      ApiService.get(API.getAllCategory)
        .then(res => {
          if (res) {
            dispatch({type: GETAllCATEGORY, payload: res});
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

//get all restaurants
export const getAllRestaurants = data => {
  return async dispatch => {
    try {
      const options = {payloads: data};
      ApiService.post(API.getAllRestaurant, options)
        .then(res => {
          console.log('res >> ', res);
          if (res) {
            dispatch({type: GETALLRESTAURANTS, payload: res});
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

//get all popular restaurants
export const getpopularRestaurants = frmdata => {
  return async dispatch => {
    try {
      const data = {
        latitute: '38.16523',
        longitude: '13.35856',
      };
      const options = {payloads: data};
      ApiService.get(API.getpopularRestaurants, data)
        .then(res => {
          console.log('res >> ', res);
          if (res) {
            // dispatch({type: GETALLEXTERNALRESTAURANT, payload: res});
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
