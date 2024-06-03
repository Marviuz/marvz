import path from 'node:path';
import findCacheDirectory from 'find-cache-dir';
import pkg from '@/../package.json';
import { ROOT_DIR } from '@root';

export const dbDir = findCacheDirectory({
  name: pkg.name,
  create: true,
  cwd: path.resolve(ROOT_DIR, '../node_modules/.cache'),
});
if (!dbDir) throw new Error("DB doesn't exist");

export const dbPath = path.resolve(dbDir, 'sqlite.db');
