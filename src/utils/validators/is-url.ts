import { z } from 'zod';

export function isUrl(value: unknown) {
  const input = z.string().url().safeParse(value);
  return input.success && input.data.startsWith('http');
}
