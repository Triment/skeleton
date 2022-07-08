import { useContext } from 'react';
import { Menu, User, Role } from '../../database/model';

export type UserContextType = Omit<User, 'role'> & {
  role: Omit<Role, 'menus'> & {
    menus: Menu[];
  };
};
