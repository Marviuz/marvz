import { eq } from 'drizzle-orm';
import { db } from '..';
import { mediaHistory } from '../schema';
import { type InsertMediaHistorySchema } from '../validations';

function create(data: InsertMediaHistorySchema) {
  return db.insert(mediaHistory).values(data).returning();
}

function findOneByPublicId(publicId: string) {
  return db.query.mediaHistory.findFirst({
    columns: {
      id: false,
    },
    where: eq(mediaHistory.publicId, publicId),
  });
}

function all() {
  return db.query.mediaHistory.findMany({
    columns: {
      id: false,
    },
  });
}

function remove(publicId: string) {
  return db
    .delete(mediaHistory)
    .where(eq(mediaHistory.publicId, publicId))
    .returning();
}

export const MediaHistoryService = {
  all,
  findOneByPublicId,
  create,
  remove,
};
