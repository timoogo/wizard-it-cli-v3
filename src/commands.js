"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var init_cli_js_1 = require("./commands/init.cli.js");
var program = new commander_1.Command();
program.version('0.0.1');
program.action(init_cli_js_1.init);
