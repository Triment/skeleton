import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany} from 'typeorm'
import { User } from './user'

@Entity()
class Menu {
    constructor(title, icon, link){
        this.title = title
        this.icon = icon
        this.link = link
    }
	@PrimaryGeneratedColumn('uuid')
	id = undefined;

	@Column('varchar')
	title = '';

    @Column('varchar')
    icon = ''

    @Column('varchar')
    link = ''

	@ManyToOne(()=>Role,role=>role.menus)
    role = undefined
}

@Entity()
class Role {

    constructor(name){
        this.raw = name
    }
	@PrimaryGeneratedColumn('uuid')
	id = undefined;

	@Column('varchar')
	raw = '';

	@OneToMany(()=>User, user=>user.role)
	users = undefined;

    @OneToMany(()=>Menu, menu =>menu.role)
    menus = undefined
}

export { Role, Menu }