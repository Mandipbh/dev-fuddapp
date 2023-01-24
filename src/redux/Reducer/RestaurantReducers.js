import * as types from '../Actions/ActionsTypes';

const initialState = {
  restaurantList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GETALLEXTERNALRESTAURANT:
      return {
        ...state,
        restaurantList: action.payload,
      };
    case types.LOGOUT:
      return {
        initialState,
      };

    default:
      return state;
  }
};
