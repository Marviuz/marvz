import { z } from 'zod';

export function ensureString(value: unknown) {
  return z.string().parse(value);
}
