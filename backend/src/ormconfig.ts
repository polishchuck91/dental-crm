import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
  username: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || 'root',
  database: process.env.DATABASE_NAME || 'mydb',
  entities: ['src/**/*.entity.ts'], // Вказати ваші сутності
  migrations: ['src/migrations/*.ts'], // Вказати папку для міграцій
  synchronize: false,
  logging: true,
});
