import {
  Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';
import { User } from './user';

@Entity()
class UploadLog {
  constructor(filepath: string) {
    this.filepath = filepath
  }

  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column('varchar',{ nullable: true })
  uploadUser!: string

  @Column('varchar')
  filepath!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}

export { UploadLog };
