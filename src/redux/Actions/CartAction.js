import * as types from './ActionsTypes';

export const AddToCart = payload => {
  return {
    type: types.ADDTOCART,
    payload,
  };
};
