// eslint-disable-next-line @typescript-eslint/no-var-requires
const { DataSource } = require('typeorm');

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
for (const envName of Object.keys(process.env)) {
  process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
}

const connectionSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [process.cwd() + '/dist/**/*.entity.{ts,js}'],
  migrations: [process.cwd() + '/dist/migrations/**/*.js'],

  logging: 'all',
});

module.exports = {
  connectionSource,
};
