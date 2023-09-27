import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [process.cwd() + '/dist/**/*.entity.{ts,js}'],
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  migrationsRun: process.env.DATABASE_MIGRATIONS === 'true',

  logging: 'all',
});
