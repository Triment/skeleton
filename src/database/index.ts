import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from '../config';
import { Analysis, Comment, Menu, Post, Role, UploadLog, User } from './model';

const DataBase = new DataSource({
  type: 'mysql',
  database: 'blog',
  host: config.databaseConfig.uri,
  username: config.databaseConfig.username,
  password: config.databaseConfig.password,
  synchronize: true,
  entities: [UploadLog, Analysis, Comment, Post, Menu, Role, User],
  migrations: [],
});

export { DataBase };
