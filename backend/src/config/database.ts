import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  pass: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
}));
