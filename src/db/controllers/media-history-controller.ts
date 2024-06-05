import { eq, getTableColumns } from 'drizzle-orm';
import { db } from '..';
import { mediaHistory } from '../schema';
import { type InsertMediaHistorySchema } from '../validations';

const { id: _, ...rest } = getTableColumns(mediaHistory);

function create(data: InsertMediaHistorySchema) {
  return db.insert(mediaHistory).values(data).returning();
}

function findOneByPublicId(publicId: string) {
  return db.query.mediaHistory.findFirst({
    where: eq(mediaHistory.publicId, publicId),
  });
}

function all() {
  return db.select(rest).from(mediaHistory);
}

function remove(publicId: string) {
  return db
    .delete(mediaHistory)
    .where(eq(mediaHistory.publicId, publicId))
    .returning();
}

export const MediaHistoryController = {
  all,
  findOneByPublicId,
  create,
  remove,
};
