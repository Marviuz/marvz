import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { cancel, group, text } from '@clack/prompts';
import { ensureString } from '@/utils/validators/is-string';
import { select } from '@/utils/wrappers/clack';

export async function runDir(inputSrc: string) {
  const { file, output, outputFile } = await group(
    {
      file: async () => {
        const contents = await readdir(inputSrc, {
          withFileTypes: true,
        });

        const options = contents
          .filter((option) => option.isFile())
          .map((option) => ({ label: option.name, value: option.name }));

        return select({
          message: 'File',
          options,
          initialValue: options.at(1)?.value,
        });
      },
      output: () =>
        text({
          message: 'Output location',
          initialValue: inputSrc,
        }),
      outputFile: ({ results }) =>
        text({
          message: 'New filename',
          initialValue: results.file?.replace(/\.ts$/, '.mp4'),
        }),
    },
    {
      onCancel: () => {
        cancel('Operation cancelled.');
        process.exit(0);
      },
    },
  );

  const input = path.resolve(inputSrc.toString(), file.toString());
  const convertedOutput = path.resolve(output, ensureString(outputFile));

  return {
    input,
    output: convertedOutput,
  };
}
