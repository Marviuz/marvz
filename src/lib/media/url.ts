import path from 'node:path';
import { text } from '@clack/prompts';
import { ensureString } from '@/utils/validators/is-string';

export async function runURL(inputSrc: string) {
  const outputPath = await text({
    message: 'Where do you want to save?',
  });

  const outputFile = await text({
    message: 'Filename',
  });

  const strOutputPath = ensureString(outputPath);
  const strOutputFile = ensureString(outputFile);

  const convertedOutput = path.resolve(strOutputPath, strOutputFile);

  return {
    input: inputSrc,
    output: convertedOutput,
  };
}
