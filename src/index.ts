#!/usr/bin/env node

import { Command } from 'commander';
import pkg from '@/../package.json';
import { media } from './cli/media';
import { git } from './cli/git';

const program = new Command()
  .name(pkg.name)
  .description(pkg.description)
  .version(pkg.version);

program.addCommand(media).addCommand(git);

program.parse();
