import { getTableColumns } from 'drizzle-orm';
import { db } from '..';
import { mediaHistory } from '../schema';
import { type InsertMediaHistorySchema } from '../validations';

function create(data: InsertMediaHistorySchema) {
  return db.insert(mediaHistory).values(data).returning();
}

function all() {
  const { id: _, ...rest } = getTableColumns(mediaHistory);
  return db.select(rest).from(mediaHistory);
}

export const MediaHistoryController = { all, create };
