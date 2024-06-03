import { spinner } from '@clack/prompts';
import { MediaHistoryController } from '@/db/controllers/media-history-controller';
import { handleErrors } from '@/utils/error-handler';
import { exec } from '@/utils/exec';

export async function processMediaInput(input: string, output: string) {
  const s = spinner();
  try {
    s.start('Processing...');
    await exec(`ffmpeg -i "${input}" -c copy "${output}"`);

    s.message('Updating cache...');
    await MediaHistoryController.create({ from: input, to: output });

    s.stop('Done');
  } catch (err) {
    handleErrors(err);
    process.exit(1);
  }
}
