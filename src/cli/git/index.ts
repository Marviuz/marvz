import { Command } from 'commander';
import { clean } from './clean-branches';

export const git = new Command()
  .name('git')
  .description('Some git helpers')
  .addCommand(clean);
