import path from 'node:path';
import { cancel, group, intro, log, outro } from '@clack/prompts';
import { Command } from 'commander';
import open from 'open';
import { MediaHistoryController } from '@/db/controllers/media-history-controller';
import { select } from '@/utils/wrappers/clack';
import { greet } from '@/utils/greet';

export const mediaHistory = new Command()
  .name('history')
  .description('View conversion history')
  .action(async () => {
    intro();
    log.message(await greet('Media history'));

    try {
      const { histItem: historyItemId, action } = await group(
        {
          histItem: async () => {
            const history = await MediaHistoryController.findAll();

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

      const item =
        await MediaHistoryController.findOneByPublicId(historyItemId);
      if (!item) throw new Error('Item not found');

      switch (action) {
        case 'open-file': {
          await open(item.to);
          break;
        }
        case 'open-dir': {
          const dirname = path.dirname(item.to);
          await open(dirname);
          break;
        }
        case 'del-item-hist': {
          await MediaHistoryController.remove(historyItemId);
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
