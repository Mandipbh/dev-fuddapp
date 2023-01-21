import * as types from '../Actions/ActionsTypes';

const initialState = {
  categoryList:[]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GETAllCATEGORY:
      console.log('reducers >>. ', action.payload);
      return {
        ...state,
        categoryList: action.payload,
      };
      case types.LOGOUT:
      return {
        initialState,
      };

    default:
      return state;
  }
};
