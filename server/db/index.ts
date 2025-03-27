import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const connectionString = process.env.DATABASE_URL;
console.log('Attempting to connect to database...');

if (!connectionString) {
  console.error('DATABASE_URL environment variable is not set');
  throw new Error('DATABASE_URL environment variable is not set');
}

console.log('Initializing database connection...');
const sql = neon(connectionString);
const db = drizzle(sql, { schema });
console.log('Database connection initialized successfully');

export { db }; 