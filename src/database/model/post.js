import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { Comment } from './comment'
import { User } from './user'
/** 文章 **/
@Entity()
class Post{
	@PrimaryGeneratedColumn('uuid')
	id = undefined;

	@Column('text')
	title = '';

	@Column('text')
	content = '';

	@ManyToOne(()=>User, author=>author.posts)
	author = undefined;
	
	@Column('simple-array', { select: true, nullable: true })
	@OneToMany(()=>Comment, comment=>comment.post)
	comments = undefined;
}

export { Post }