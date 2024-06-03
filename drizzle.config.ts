import { defineConfig } from 'drizzle-kit';
import { dbPath } from '@/utils/cache-dir';

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: dbPath,
  },
});
