import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
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

  @Column('simple-array', {
    nullable: true,
  })
  @ManyToMany(() => Role, (role) => role.menus)
  roles!: Role[];
}

@Entity()
class Role {
  constructor(name: string) {
    this.raw = name;
  }
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column('varchar')
  raw: string;

  @Column('int', {
    default: 512,
  })
  bandwidth!: number;

  @Column('simple-array', {
    nullable: true,
  })
  @OneToMany(() => User, (user) => user.role)
  users!: User[];

  @JoinTable()
  @Column('simple-array')
  @ManyToMany(() => Menu, (menu) => menu.roles, {
    cascade: true,
  })
  menus!: Menu[];
}

export { Role, Menu };
