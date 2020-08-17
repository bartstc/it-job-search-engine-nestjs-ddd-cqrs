import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  // url: process.env.DB_URL,
  synchronize: false,
  // migrationsRun: true,
  logging: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  // entities: ['dist/**/*.entity.js'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = config;
