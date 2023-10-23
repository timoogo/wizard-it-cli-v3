#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var fs_1 = require("fs");
var init_cli_js_1 = require("./commands/init.cli.js");
var utils_constant_js_1 = require("./resources/constants/utils.constant.js");
var config_cli_js_1 = require("./commands/config.cli.js");
var generate_cli_js_1 = require("./commands/generate.cli.js");
var panel_cli_js_1 = require("./commands/generate/panel.cli.js");
var database_cli_js_1 = require("./commands/generate/database.cli.js");
var program = new commander_1.Command();
program.version('0.0.1');
program
    .command('init')
    .description('Initialize a new project')
    .action(init_cli_js_1.init);
program
    .command('settings')
    .description('Change the settings of the project')
    .action(config_cli_js_1.configureSettings);
// Check if .wizgen exists
if (!fs_1.default.existsSync(utils_constant_js_1.directoryName))
    (0, init_cli_js_1.init)();
var generate = program
    .command('generate')
    .description('Generate command with subcommands');
// Sous-commande `entity` pour la commande `generate`
generate
    .command('entity')
    .description('Generate an entity')
    .alias('gen:entity')
    .option("--append", "Append the entity to the existing ones")
    .action(generate_cli_js_1.createEntityDefinition);
// Sous-commande `panel` pour la commande `generate`
generate
    .command('panel')
    .description('Generate a panel for a specific entity in a Next.js application')
    .action(panel_cli_js_1.generatePanel);
generate
    .command('env')
    .description('Generate a .env file with the database credentials')
    .action(generate_cli_js_1.generateEnv);
generate
    .command('database')
    .description('Generate a database')
    .action(database_cli_js_1.generateDb);
program.parse(process.argv);
