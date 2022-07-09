import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Comment } from './comment';
import { User } from './user';
/** 文章 **/
@Entity()
class Post {
  @PrimaryGeneratedColumn('uuid')
  id: String | undefined;

  @Column('text')
  title: String| undefined;

  @Column('text')
  content: String | undefined;

  @ManyToOne(() => User, (author) => author.posts)
  @Column({
    default: null
  })
  author: User | undefined;

  @Column('simple-array', { select: true, nullable: true })
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[] = [];
}

export { Post };
