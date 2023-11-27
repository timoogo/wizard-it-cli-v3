import fs from "fs";
import {QuestionsKeysEnum} from "../resources/global/translations.js";
import {Prompter} from "../utils/prompter.utils.js";
import {locateSettings} from "../commands/config.cli.js";

    export const setDriver = async () => {
        const prompter = new Prompter();
        const driver = await prompter.ask(QuestionsKeysEnum.SELECT_DRIVER);
        if (!driver) {
            console.error("No driver chosen");
            return null;
        }
        const settingsPath = locateSettings();
        const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
        if (!settings.database) {
            settings.database = {};
        }
        settings.database.driver = driver;
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
        console.log(`Driver set to ${driver}`);
        return driver;
    }

    export const setPort = async () => {
        const prompter = new Prompter();
        const port = await prompter.ask(QuestionsKeysEnum.PORT);
        if (!port) {
            console.error("No port chosen");
            return null;
        }
        const settingsPath = locateSettings();
        const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
        if (!settings.database) {
            settings.database = {};
        }
        settings.database.port = parseInt(port);
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
        console.log(`Port set to ${port}`);
        return port;
    }

    export const setHostName = async () => {
        const prompter = new Prompter();
        const hostName = await prompter.ask(QuestionsKeysEnum.HOST_NAME);
        if (!hostName) {
            console.error("No host name chosen");
            return null;
        }
        const settingsPath = locateSettings();
        const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
        if (!settings.database) {
            settings.database = {};
        }
        settings.database.hostName = hostName;
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
        console.log(`Host name set to ${hostName}`);
        return hostName;
    }

    export const setUserName = async () => {
        const prompter = new Prompter();
        const userName = await prompter.ask(QuestionsKeysEnum.USER_NAME);
        if (!userName) {
            console.error("No user name chosen");
            return null;
        }
        const settingsPath = locateSettings();
        const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
        if (!settings.database) {
            settings.database = {};
        }
        settings.database.userName = userName;
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
        console.log(`User name set to ${userName}`);
        return userName;
    }

    export const setPassword = async () => {
        const prompter = new Prompter();
        const password = await prompter.ask(QuestionsKeysEnum.PASSWORD);
        if (!password) {
            console.error("No password chosen");
            return null;
        }
        const settingsPath = locateSettings();
        const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
        if (!settings.database) {
            settings.database = {};
        }
        settings.database.password = password;
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
        console.log(`Password set to ${password}`);
        return password;
    }

    export const setDatabaseName = async () => {
        const prompter = new Prompter();
        const databaseName = await prompter.ask(QuestionsKeysEnum.DATABASE_NAME);
        if (!databaseName) {
            console.error("No database name chosen");
            return null;
        }
        const settingsPath = locateSettings();
        const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
        if (!settings.database) {
            settings.database = {};
        }
        settings.database.databaseName = databaseName;
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
        console.log(`Database name set to ${databaseName}`);
        return databaseName;
    }

    export const resetDatabase = async () => {
        const prompter = new Prompter();
        const resetDatabase = await prompter.ask(QuestionsKeysEnum.CONFIRM_DELETE_DATABASE);
        if (!resetDatabase) {
            console.error("No database name chosen");
            return null;
        }
        const settingsPath = locateSettings();
        const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
        if (!settings.database) {
            settings.database = {};
        }
        settings.database = {};
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));

    }