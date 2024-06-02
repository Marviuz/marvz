import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { select, text } from '@clack/prompts';

export async function runDir(inputSrc: string) {
  const contents = await readdir(inputSrc, {
    withFileTypes: true,
  });

  const options = contents
    .filter((option) => option.isFile())
    .map((option) => ({ label: option.name, value: option.name }));

  const file = await select({
    message: 'File',
    options,
    initialValue: options.at(1)?.value,
  });

  const output = await text({
    message: 'Output location',
    initialValue: inputSrc.toString(),
  });

  const outputFile = await text({
    message: 'New filename',
    initialValue: file.toString().replace(/\.ts$/, '.mp4'),
  });

  const input = path.resolve(inputSrc.toString(), file.toString());
  const convertedOutput = path.resolve(
    output.toString(),
    outputFile.toString(),
  );

  return {
    input,
    output: convertedOutput,
  };
}
