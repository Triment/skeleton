import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinTable,
  Relation,
} from 'typeorm';
import { User } from './user';

@Entity()
class Menu {
  constructor(title: string, icon: string, link: string) {
    this.title = title;
    this.icon = icon;
    this.link = link;
  }
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column('varchar')
  title: string;

  @Column('varchar')
  icon: string;

  @Column('varchar')
  link: string;

  @ManyToOne(() => Role, (role) => role.menus)
  roles!: Relation<Role>;
}

@Entity()
class Role {
  constructor(name: string) {
    this.raw = name;
  }
  @PrimaryGeneratedColumn('uuid')
  id: string|undefined;

  @Column('varchar')
  raw: string;

  @OneToMany(() => User, (user) => user.role)
  @Column({
    default: []
  })
  users: User|undefined;

  @JoinTable()
  @OneToMany(() => Menu, (menu) => menu.roles)
  @Column({
    default: []
  })
  menus!: Relation<Menu>[];
}

export { Role, Menu };
