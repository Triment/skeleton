import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Post } from './post';
import { User } from './user';
@Entity()
class Comment {
  @PrimaryGeneratedColumn('uuid')
  id = undefined;

  @Column('text')
  content: string | undefined;
  @Column('int', {
    default: 0
  })
  approved: number | undefined;

  @Column('int', {
    default: 0
  })
  disapproving: number | undefined;

  @ManyToOne(() => User, (user) => user.comments)
  @Column({
    default: null
  })
  author: User | undefined;
  @ManyToOne(() => Post, (post) => post.comments)
  post: Post | undefined;
}

export { Comment };
