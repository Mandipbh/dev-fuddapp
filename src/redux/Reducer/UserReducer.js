import * as types from '../Actions/ActionsTypes';

const initialState = {
  login: false,
  onBoarding: false,
  userDetails: '',
  address: [],
  selAddress: null,
  storedTime: null,
  storedDate: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.IS_LOGIN:
      return {
        ...state,
        login: action.payload,
      };
    case types.STORED_TIME:
      return {
        ...state,
        storedTime: action.payload,
      };
    case types.STORED_DATE:
      return {
        ...state,
        storedDate: action.payload,
      };
    case types.USER_DETAILS: {
      return {
        ...state,
        userDetails: action.payload,
      };
    }
    case types.SELECTEDADDRESS:
      return {
        ...state,
        selAddress: action.payload,
      };
    case types.GETALLADDRESS: {
      return {
        ...state,
        address: action.payload,
      };
    }
    case types.LOGOUT:
      return {
        initialState,
      };

    default:
      return state;
  }
};
