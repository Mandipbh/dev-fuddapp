import ApiService, {API} from '../../utils/ApiService';
import {
  GETAllCATEGORY,
  GETALLEXTERNALRESTAURANT,
  GETALLRESTAURANTS,
  ORDERS,
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
      ApiService.get(API.GetAllExternalRestaurant).then(res => {
        if (res) {
          // console.log('res ????  GetAllExternalRestaurant', res);
          dispatch({type: GETALLRESTAURANTS, payload: res});
        }
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
      ApiService.post(API.GetAllExclusivesRestaurant, options)
        .then(res => {
          // console.log('res >>GetAllExclusivesRestaurant ', res);
          if (res) {
            dispatch({type: GETALLEXTERNALRESTAURANT, payload: res});
          }
        })
        .catch(c => {
          console.log('catch of restaurants >> ', c.response);
        });
    } catch (error) {
      console.log('error in restaurants', error);
    }
  };
};
