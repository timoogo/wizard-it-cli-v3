#!/usr/bin/env node
import { Command } from 'commander';

import path from 'path';
import fs from 'fs';
import { Prompter } from './utils/prompter.utils.js';
import { generateEntity, generatePanel } from './commands/generate.cli.js';
import { init } from './commands/init.cli.js';



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
// Commande principale `generate`
const generate = program
    .command('generate')
    .description('Generate command with subcommands');

// Sous-commande `entity` pour la commande `generate`
generate
    .command('entity')
    .description('Generate an entity')
    .action(generateEntity);

// Sous-commande `panel` pour la commande `generate`
generate
    .command('panel')
    .description('Generate a panel for a specific entity in a Next.js application')
    .action(generatePanel);


program.parse(process.argv);
