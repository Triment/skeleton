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

  @Column('simple-array')
  @ManyToOne(() => Role, (role) => role.menus)
  roles!: Role[];
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

  @Column('simple-array')
  @OneToMany(() => User, (user) => user.role)
  users!: User[];

  @JoinTable()
  @Column('simple-array')
  @OneToMany(() => Menu, (menu) => menu.roles)
  menus!: Menu[];
}

export { Role, Menu };
