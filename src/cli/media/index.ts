import { intro, outro, text } from '@clack/prompts';
import { Command } from 'commander';
import { runDir } from '@/lib/media/directory';
import { runFile } from '@/lib/media/file';
import { processMediaInput } from '@/lib/media/process-media-input';
import { runURL } from '@/lib/media/url';
import { validateInput } from '@/utils/validators/file-types';

export const media = new Command()
  .name('media')
  .description('Convert/Download media using ffmpeg')
  .argument('[input]', 'Directory, file path or URL')
  .action(async () => {
    intro('Convert/Download media using ffmpeg');

    const inputSrc = await text({
      message: 'Directory, file path or URL',
    });

    const { type, value } = validateInput(inputSrc);

    if (type === 'dir') {
      const { input, output } = await runDir(value);
      await processMediaInput(input, output);
    } else if (type === 'file') {
      const { input, output } = await runFile(value);
      await processMediaInput(input, output);
    } else {
      const { input, output } = await runURL(value);
      await processMediaInput(input, output);
    }

    outro("You're all set!");
  });
