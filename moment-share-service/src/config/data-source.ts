import { DataSource, DataSourceOptions } from 'typeorm';
import { constants } from '../../constants';

export const typeormConfigOptions = {
  type: constants.database.TYPE,
  host: constants.database.HOST,
  port: constants.database.PORT,
  username: constants.database.USERNAME,
  password: constants.database.PASSWORD,
  database: constants.database.DBNAME,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  logging: true,
} as DataSourceOptions;

const dataSource = new DataSource(typeormConfigOptions);
export default dataSource;
