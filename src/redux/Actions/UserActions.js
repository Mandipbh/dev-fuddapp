import * as types from './ActionsTypes';

export const isLogin = payload => {
  console.log('payload of login >>. ', payload);
  return {
    type: types.IS_LOGIN,
    payload,
  };
};

export const userData = payload => {
  console.log('data >> of user payload > ', payload);
  return {
    type: types.USER_DETAILS,
    payload,
  };
};
