import { Command } from 'commander';
import { greet } from '@/utils/greet';
import { clean } from './clean-branches';

const greeting = await greet('Git utilities');

export const git = new Command()
  .name('git')
  .description('Some git helpers')
  .addHelpText('before', greeting)
  .addCommand(clean);
