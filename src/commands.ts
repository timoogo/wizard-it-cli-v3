import { Command } from 'commander';
import { init } from './commands/init.cli.js';

const program = new Command();

program.version('0.0.1');

program.action(init);