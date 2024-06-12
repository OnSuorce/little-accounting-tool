// store/rootReducer.ts
import { combineReducers } from 'redux';
import userReducer from './slice/userSlice';

export const rootReducer = combineReducers({
    user: userReducer,
});
