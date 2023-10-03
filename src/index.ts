#!/usr/bin/env node
import { Command } from 'commander';
import { init } from './commands/init.cli.js';
import path from 'path';
import fs from 'fs';
import { Prompter } from './utils/Prompter.js';
import { generate } from './commands/generate.cli.js';
const program = new Command();

// Check if .wizgen exists
const wizgenPath = path.join(process.cwd(), '.wizgen');
if (!fs.existsSync(wizgenPath)) {
    // If .wizgen doesn't exist, execute init command
    init();
} else {
    console.log('.wizgen directory exists, skipping init.');
}

// If you want to use the Prompter class for interactive questions

// For demonstration, you can ask a question like this:
program
    .command('generate')
    .description('Generate an entity')
    .option('--append', 'Append to existing entity definition file')    
    .action((cmd) => generate(cmd))

program.parse(process.argv);
