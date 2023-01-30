import * as types from '../Actions/ActionsTypes';

const initialState = {
  cartData: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ADDTOCART:
      return {
        ...state,
        cartData: action.payload,
      };

    case types.LOGOUT:
      return {
        initialState,
      };

    default:
      return state;
  }
};
