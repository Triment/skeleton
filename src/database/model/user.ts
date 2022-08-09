import { createHmac } from 'crypto';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Comment } from './comment';
import { Post } from './post';
import { Role } from './role';
import { UploadLog } from './upload';
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
    avatar: string,
    role: Role,
  ) {
    this.username = username;
    this.password = password;
    this.active = active;
    this.email = email;
    this.avatar = avatar;
    this.role = role;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column('varchar')
  username: string;

  @Column('varchar')
  avatar: string | undefined;

  @Column('varchar', {
    select: false,
  })
  password: string;

  @Column('boolean', {
    default: true,
  })
  active: boolean;

  @Column('varchar')
  email: string;

  @JoinTable()
  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @Column('simple-array', { select: false, nullable: true })
  @OneToMany(() => Post, (post) => post.author)
  posts!: Post[];

  @Column('simple-array', { select: false, nullable: true })
  @OneToMany(() => Comment, (comment) => comment.author)
  comments!: Comment[];

  @Column('simple-array', { select: false, nullable: true })
  @OneToMany(() => UploadLog, (UploadLog) => UploadLog.uploadUser)
  uploadFiles!: Relation<UploadLog>[];

  @BeforeInsert()
  async hashPassword() {
    this.password = aesEncrypt(this.password);
  }
  @BeforeUpdate()
  async hashPwd() {
    if (!!this.password) {
      this.password = aesEncrypt(this.password);
    }
  }
}

export { User };
