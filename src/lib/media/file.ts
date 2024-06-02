import path from 'node:path';
import { text } from '@clack/prompts';
import { ensureString } from '@/utils/validators/is-string';

export async function runFile(inputSrc: string) {
  const basename = path.basename(inputSrc);
  const dirname = path.dirname(inputSrc);

  const outputFile = await text({
    message: 'New filename',
    initialValue: basename.toString().replace(/\.ts$/, '.mp4'),
  });

  const stringOutput = ensureString(outputFile);
  const input = path.resolve(dirname, inputSrc);
  const convertedOutput = path.resolve(dirname, stringOutput);

  return {
    input,
    output: convertedOutput,
  };
}
