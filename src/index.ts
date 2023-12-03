#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'fs';

import { init } from './commands/init.cli.js';
import {directoryName} from "./resources/constants/utils.constant.js";
import {configureSettings} from "./commands/config.cli.js";
import {createEntityDefinition, generateEnv} from "./commands/generate.cli.js";
import {generatePanel} from "./commands/generate/panel.cli.js";
import {generateDb} from "./commands/generate/database.cli.js";
import {generateEntityDefinition, modifyEntityDefinition} from "./commands/generate/utils.cli.js";



const program = new Command();

program.version('0.0.1');

program
    .command('init')
    .description('Initialize a new project')
    .action(init);

program
    .command('settings')
    .description('Change the settings of the project')
    .action(configureSettings);

// Check if .wizgen exists

if (!fs.existsSync(directoryName)) init();











const generate = program
    .command('generate')
    .description('Generate command with subcommands');

// Sous-commande `entity` pour la commande `generate`
// generate
//     .command('entity')
//     .description('Generate an entity')
//     .alias('gen:entity')
//     .option("--append", "Append the entity to the existing ones")
//     .action(createEntityDefinition);

generate
    .command('entity')
    .description('Generate an entity')
    .alias('gen:entity')
//    .option("--append", "Append the entity to the existing ones")
    .action(generateEntityDefinition);

generate
    .command('entity:modify')
    .description('Modify an entity')
    .action(modifyEntityDefinition); // Pas de paramètre passé à la fonction modifyEntityDefinition
// Sous-commande `panel` pour la commande `generate`
generate
    .command('panel')
    .description('Generate a panel for a specific entity in a Next.js application')
    .action(generatePanel);

generate
    .command('env')
    .description('Generate a .env file with the database credentials')
    .action(generateEnv);


generate
    .command('database')
    .description('Generate a database')
    .action(generateDb);

program.parse(process.argv);
