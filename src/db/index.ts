import SQLite from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { dbPath } from '@/utils/cache-dir';
import * as schema from './schema';

const sqlite = new SQLite(dbPath);
export const db = drizzle(sqlite, { schema });
