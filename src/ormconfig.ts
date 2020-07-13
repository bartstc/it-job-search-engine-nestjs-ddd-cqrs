import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
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