import { createSlice } from '@reduxjs/toolkit';
import { User } from '../database/model';

export interface UserStore {
  token: string,
  user: [k of User]
}

export const userSlice = createSlice({
  name: 'counter',
  initialState: {
    token: '',
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = '';
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
