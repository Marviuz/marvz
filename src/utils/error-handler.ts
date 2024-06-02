/* eslint-disable no-console -- log errors */

import { ZodError } from 'zod';

type HandleErrorReturnType =
  | {
      type: 'Common';
      error: Error;
    }
  | {
      type: 'ZodError';
      error: ZodError;
    }
  | {
      type: 'UnhandledError';
      error: Error;
    };

export function handleErrors(error: unknown): HandleErrorReturnType {
  if (error instanceof Error) {
    console.log(error.message);
    return {
      type: 'Common',
      error,
    };
  }

  if (error instanceof ZodError)
    return {
      type: 'ZodError',
      error,
    };

  const defaultError: HandleErrorReturnType = {
    type: 'UnhandledError',
    error: new Error('UnhandledError'),
  };

  console.log(defaultError.error.message);

  return defaultError;
}
