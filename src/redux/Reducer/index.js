import {combineReducers} from 'redux';
import UserReducer from './UserReducer';
import HomeReducers from './HomeReducers';
const Reducers = combineReducers({
  UserReducer,
  HomeReducers,
});

export default Reducers;
