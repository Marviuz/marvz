import path from 'node:path';
import { cancel, group, intro, outro } from '@clack/prompts';
import { Command } from 'commander';
import open from 'open';
import { MediaHistoryController } from '@/db/controllers/media-history-controller';
import { select } from '@/utils/wrappers/clack';

export const mediaHistory = new Command()
  .name('history')
  .description('View conversion history')
  .action(async () => {
    intro('Viewing history');

    try {
      const { histItem, action } = await group(
        {
          histItem: async () => {
            const history = await MediaHistoryController.all();

            const options = history.map((hist) => ({
              value: hist.publicId,
              label: hist.to,
            }));

            return select({
              message: 'File',
              options,
            });
          },
          action: () =>
            select({
              message: 'What do you want to do with it?',
              options: [
                { value: 'open-file', label: 'Open file' },
                { value: 'open-dir', label: 'Open directory' },
                { value: 'del-item-hist', label: 'Delete item in history' },
              ],
            }),
        },
        {
          onCancel: () => {
            cancel('Operation cancelled');
            process.exit(0);
          },
        },
      );

      switch (action) {
        case 'open-file': {
          const item = await MediaHistoryController.findOneByPublicId(histItem);
          if (!item) throw new Error('Item not found');
          await open(item.to);
          break;
        }
        case 'open-dir': {
          const dirname = path.dirname(histItem);
          await open(dirname);
          break;
        }
        case 'del-item-hist': {
          await MediaHistoryController.remove(histItem);
          break;
        }
        default:
          throw new Error("This shouldn't happen!");
      }
    } catch (err) {
      if (err instanceof Error) {
        outro(`An error occured! ${err.message}`);
        return;
      }

      outro('Unhandled error occured!');
      return;
    }

    outro("You're all set!");
  });
