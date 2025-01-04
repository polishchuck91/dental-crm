import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
  username: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || 'password',
  database: process.env.DATABASE_NAME || 'mydb',
  synchronize: process.env.DB_SYNCHRONIZE === 'true', // Set to true only in dev mode
  logging: process.env.DB_LOGGING === 'true', // Set to true in dev mode
}));
