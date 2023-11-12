import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import postReducer from '../features/postSlice';

const rootReducer = combineReducers({
  user: userReducer,
  post:postReducer
});

export default rootReducer;