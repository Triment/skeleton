import { createCipheriv, createDecipheriv, createHash, createHmac, scryptSync } from 'crypto'
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, BeforeUpdate, BeforeInsert, ManyToMany, ManyToOne } from 'typeorm'
import { Comment } from './comment';
import { Post } from './post';
import { Role } from './role'
export function aesEncrypt(data) {
    const hmac = createHmac('sha256', process.env.SECRET_KEY || 'complaint')
    return hmac.update(data).digest('hex')
}

@Entity()
class User {
    constructor(username, password, active, email){
        this.username = username
        this.password = password
        this.active = active
        this.email = email
        //this.role = new Role('admin')
    }

    @PrimaryGeneratedColumn('uuid')
    id = undefined;

    @Column('varchar')
    username = '';
    @Column('varchar', {
        select: false
    })
    password = '';
    @Column('boolean')
    active = false;
    @Column('varchar')
    email = '';
    @ManyToOne(()=>Role, role => role.users)
    role = undefined;
    @Column('simple-array',{ select: false, nullable: true })
    @OneToMany(()=>Post, post=>post.author)
    posts = undefined;
    @Column('simple-array',{ select: false, nullable: true })
    @OneToMany(()=>Comment, comment=>comment.author)
    comments = undefined;

    @BeforeInsert()
    async hashPassword() {
        this.password = aesEncrypt(this.password)
    }
    @BeforeUpdate()
    async hashPwd(){
        this.password = aesEncrypt(this.password)
    }
}

export { User }