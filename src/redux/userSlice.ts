import { createSlice } from '@reduxjs/toolkit';
import { Menu, Role, User } from '../database/model';

export interface UserStore {
  user: UserType;
}

export type RoleType = Omit<Role, 'menus'> & {
  menus: Menu[];
  bandwidth: number;
};
export type UserType = Omit<User, 'role'> & {
  role: RoleType;
};

export const userSlice = createSlice({
  name: 'counter',
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      console.log(action);
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
