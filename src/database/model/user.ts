import { createHmac } from 'crypto';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeUpdate,
  BeforeInsert,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { Comment } from './comment';
import { Post } from './post';
import { Role } from './role';
export function aesEncrypt(data: string) {
  const hmac = createHmac('sha256', process.env.SECRET_KEY || 'complaint');
  return hmac.update(data).digest('hex');
}

@Entity()
class User {
  constructor(
    username: string,
    password: string,
    active: boolean,
    email: string,
    role: Role
  ) {
    this.username = username;
    this.password = password;
    this.active = active;
    this.email = email;
    this.role = role
  }

  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column('varchar')
  username: string;

  @Column('varchar', {
    select: false,
  })
  password: string;

  @Column('boolean',{
    default: true
  })
  active:boolean;

  @Column('varchar')
  email:string;

  @JoinTable()
  @Column({
    default: null
  })
  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @Column('simple-array', { select: false, nullable: true })
  @Column({
    default: []
  })
  @OneToMany(() => Post, (post) => post.author)
  @Column({
    default: []
  })
  posts: Post[] | undefined;

  @Column('simple-array', { select: false, nullable: true })
  @Column({
    default: []
  })
  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[] | undefined;

  @BeforeInsert()
  async hashPassword() {
    this.password = aesEncrypt(this.password);
  }
  @BeforeUpdate()
  async hashPwd() {
    this.password = aesEncrypt(this.password);
  }
}

export { User };
