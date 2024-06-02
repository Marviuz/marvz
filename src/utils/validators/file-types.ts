import { lstatSync } from 'node:fs';
import { ensureString } from './is-string';
import { isUrl } from './is-url';

type ValidateInputReturnType = { type: 'dir' | 'file' | 'url'; value: string };

export function validateInput(value: unknown): ValidateInputReturnType {
  const $value = ensureString(value);

  if (isUrl(value)) return { type: 'url', value: $value };

  const stat = lstatSync($value);
  if (stat.isDirectory() && !stat.isFile())
    return { type: 'dir', value: $value };

  if (!stat.isDirectory() && stat.isFile())
    return { type: 'file', value: $value };

  throw new Error('Not a valid file, directory or url');
}
