import { configureStore } from '@reduxjs/toolkit';
import userReducer, { UserStore } from './userSlice';
export default configureStore({
  reducer: {
    userInfo: userReducer,
  },
});

export interface GlobalStore {
  userInfo: UserStore
}