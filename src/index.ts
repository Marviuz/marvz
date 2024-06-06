#!/usr/bin/env node

import { Command } from 'commander';
import pkg from '@/../package.json';
import { git } from './cli/git';
import { media } from './cli/media';
import { greet } from './utils/greet';

const greeting = await greet('Marvz');

const program = new Command()
  .name(pkg.name)
  .description(pkg.description)
  .addHelpText('before', greeting)
  .version(pkg.version);

program.addCommand(media).addCommand(git);

program.parse();
