import { cancel, intro, isCancel, outro, text } from '@clack/prompts';
import { Command } from 'commander';
import { z } from 'zod';
import { runDir } from '@/lib/media/directory';
import { runFile } from '@/lib/media/file';
import { runURL } from '@/lib/media/url';
import { processMediaInput } from '@/lib/media/process-media-input';
import { validateInput } from '@/utils/validators/file-types';
import { mediaHistory } from './history';

type Input = string | symbol | undefined;

export const media = new Command()
  .name('media')
  .description('Convert/Download media using ffmpeg')
  .argument('[input]', 'Directory, file path or URL')
  .action(async (inputArg) => {
    let $inputArg: Input = z.string().optional().parse(inputArg);

    intro(
      !$inputArg
        ? 'Convert/Download media using ffmpeg'
        : `Processing ${$inputArg}`,
    );

    if (!$inputArg) {
      $inputArg = await text({
        message: 'Directory, file path or URL',
      });

      if (isCancel($inputArg)) {
        cancel('Operation cancelled!');
        process.exit(0);
      }
    }

    const { type, value } = validateInput($inputArg);

    switch (type) {
      case 'dir': {
        const { input, output } = await runDir(value);
        await processMediaInput(input, output);
        break;
      }
      case 'file': {
        const { input, output } = await runFile(value);
        await processMediaInput(input, output);
        break;
      }
      case 'url': {
        const { input, output } = await runURL(value);
        await processMediaInput(input, output);
        break;
      }
    }

    outro("You're all set!");
  });

media.addCommand(mediaHistory);
