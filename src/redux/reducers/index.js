import { combineReducers } from 'redux';
import { userReducer } from './userReducers';
import { getAdminProductReducer } from './adminReducer';

const reducers = combineReducers({
    user: userReducer,
    admin: getAdminProductReducer
}); 


export default reducers;