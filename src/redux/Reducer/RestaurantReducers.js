import * as types from '../Actions/ActionsTypes';

const initialState = {
  restaurantList: [],
  restaurantDetails: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GETALLRISTORANTI:
      return {
        ...state,
        restaurantList: action.payload,
      };
    case types.GETRESTAURANTDETAILS:
      return {
        ...state,
        restaurantDetails: action.payload,
      };
    case types.LOGOUT:
      return {
        initialState,
      };

    default:
      return state;
  }
};
