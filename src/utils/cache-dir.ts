import path from 'node:path';
import findCacheDirectory from 'find-cache-dir';
import pkg from '@/../package.json';

export const dbDir = findCacheDirectory({
  name: pkg.name,
  create: true,
});

if (!dbDir) throw new Error("DB doesn't exist");

export const dbPath = path.join(dbDir, `${pkg.name}_cache.db`);
