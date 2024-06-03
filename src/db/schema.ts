import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';

export const mediaHistory = sqliteTable('media_histories', {
  id: integer('id', { mode: 'number' })
    .notNull()
    .primaryKey({ autoIncrement: true }),
  publicId: text('public_id')
    .notNull()
    .unique()
    .$defaultFn(() => nanoid()),
  from: text('from').notNull(),
  to: text('to').notNull(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});
