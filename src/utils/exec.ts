import { promisify } from 'node:util';
import { exec as execa } from 'node:child_process';

export const exec = promisify(execa);
