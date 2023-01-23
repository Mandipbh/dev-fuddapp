import * as types from '../Actions/ActionsTypes';

const initialState = {
  categoryList: [],
  addressList: [],
  GetAllExternalRestaurant: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GETAllCATEGORY:
      return {
        ...state,
        categoryList: action.payload,
      };
    case types.GETALLADDRESS:
      return {
        ...state,
        addressList: action.payload,
      };
    case types.GETALLEXTERNALRESTAURANT:
      return {
        ...state,
        GetAllExternalRestaurant: action.payload,
      };
    case types.LOGOUT:
      return {
        initialState,
      };

    default:
      return state;
  }
};
