import {combineReducers} from 'redux';
import UserReducer from './UserReducer';
import HomeReducers from './HomeReducers';
import RestaurantReducers from './RestaurantReducers';
import CartReducer from './CartReducer';
const Reducers = combineReducers({
  UserReducer,
  HomeReducers,
  RestaurantReducers,
  CartReducer,
});

export default Reducers;
