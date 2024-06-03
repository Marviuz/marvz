import { createInsertSchema } from 'drizzle-zod';
import { type z } from 'zod';
import { mediaHistory } from './schema';

export const insertMediaHistorySchema = createInsertSchema(mediaHistory);
export type InsertMediaHistorySchema = z.infer<typeof insertMediaHistorySchema>;
