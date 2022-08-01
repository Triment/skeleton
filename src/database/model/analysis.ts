import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
class Analysis {
  constructor(ip: string, uuid: string) {
    this.ip_src = ip;
    this.user_uuid = uuid;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column()
  @Index({ unique: true })
  user_uuid!: string;

  @Column()
  ip_src: string;

  @Column('int', {
    default: 1,
  })
  count!: number;

  @Column('varchar')
  last_browse: string | undefined;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}

export { Analysis };
