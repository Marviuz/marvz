import { MediaHistoryService } from '../services/media-history-service';
import { type InsertMediaHistorySchema } from '../validations';

type FindAll = { sortBy: 'asc' | 'dsc' };
function findAll(params?: Partial<FindAll>) {
  return MediaHistoryService.all({
    sortBy: params?.sortBy,
  });
}

function findOneByPublicId(publicId: string) {
  return MediaHistoryService.findOneByPublicId(publicId);
}

function create(data: InsertMediaHistorySchema) {
  return MediaHistoryService.create(data);
}

function remove(publicId: string) {
  return MediaHistoryService.remove(publicId);
}

export const MediaHistoryController = {
  findAll,
  findOneByPublicId,
  create,
  remove,
};
