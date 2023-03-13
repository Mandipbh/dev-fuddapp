import * as types from './ActionsTypes';

export const AddToCart = payload => {
  return {
    type: types.ADDTOCART,
    payload,
  };
};

export const ReOrderAction = payload => {
  return {
    type: types.REORDERS,
    payload,
  };
};
