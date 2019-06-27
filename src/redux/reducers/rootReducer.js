import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import restaurantReducer from './restaurantReducer';

const rootReducer = combineReducers({
    authReducer,
    userReducer,
    restaurantReducer
});

export default rootReducer;