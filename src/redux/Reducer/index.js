import {combineReducers} from 'redux';
import UserReducer from './UserReducer';
import HomeReducers from './HomeReducers';
import RestaurantReducers from './RestaurantReducers';
const Reducers = combineReducers({
  UserReducer,
  HomeReducers,
  RestaurantReducers,
});

export default Reducers;
