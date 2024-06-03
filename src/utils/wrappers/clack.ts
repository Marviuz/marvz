import * as clack from '@clack/prompts';
import { type SelectOption } from '../typings';

export const select: typeof clack.select<SelectOption[], string> = clack.select;
