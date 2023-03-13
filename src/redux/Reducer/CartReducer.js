import * as types from '../Actions/ActionsTypes';

const initialState = {
  cartData: [],
  reOrderData: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ADDTOCART:
      return {
        ...state.cartData,
        cartData: action.payload,
      };
    case types.REORDERS:
      return {
        ...state.reOrderData,
        reOrderData: action.payload,
      };
    case types.LOGOUT:
      return {
        initialState,
      };

    default:
      return state;
  }
};
