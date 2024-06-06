import path from 'node:path';
import { cancel, isCancel, text } from '@clack/prompts';

export async function runFile(inputSrc: string) {
  const basename = path.basename(inputSrc);
  const dirname = path.dirname(inputSrc);

  const outputFile = await text({
    message: 'New filename',
    initialValue: basename.toString().replace(/\.ts$/, '.mp4'),
  });

  if (isCancel(outputFile)) {
    cancel('Operation permitted.');
    process.exit(0);
  }

  const input = path.resolve(dirname, inputSrc);
  const convertedOutput = path.resolve(dirname, outputFile);

  return {
    input,
    output: convertedOutput,
  };
}
