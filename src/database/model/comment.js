import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm'
import { Post } from './post';
import { User } from './user'
@Entity()
class Comment {
	@PrimaryGeneratedColumn('uuid')
	id = undefined;

	@Column('text')
	content = '';
	@Column('int')
	approved = 0;
	@Column('int')
	disapproving = 0;

	@ManyToOne(()=>User, user=>user.comments)
	author = undefined;
	@ManyToOne(()=>Post, post=>post.comments)
	post = undefined;
}

export { Comment }