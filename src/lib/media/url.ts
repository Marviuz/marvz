import path from 'node:path';
import { cancel, group, text } from '@clack/prompts';

export async function runURL(inputSrc: string) {
  const { outputPath, outputFile } = await group(
    {
      outputPath: () =>
        text({
          message: 'Where do you want to save?',
        }),
      outputFile: () =>
        text({
          message: 'Filename',
        }),
    },
    {
      onCancel: () => {
        cancel('Operation permitted!');
        process.exit(0);
      },
    },
  );

  const convertedOutput = path.resolve(outputPath, outputFile);

  return {
    input: inputSrc,
    output: convertedOutput,
  };
}
