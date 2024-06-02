import { spinner } from '@clack/prompts';
import { handleErrors } from '@/utils/error-handler';
import { exec } from '@/utils/exec';

export async function processMediaInput(input: string, out: string) {
  const s = spinner();
  try {
    s.start('Processing...');
    await exec(`ffmpeg -i "${input}" -c copy "${out}"`);
    s.stop('Done');
  } catch (err) {
    handleErrors(err);
    process.exit(1);
  }
}
