import { Menu, Role, User } from '../../database/model';

export type UserContextType = Omit<User, 'role'> & {
  role: Omit<Role, 'menus'> & {
    menus: Menu[];
  };
};
