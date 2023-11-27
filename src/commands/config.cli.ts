import * as fs from "fs";
import * as path from "path";
import { __dirname} from "../resources/constants/utils.constant.js";
import { Prompter} from "../utils/prompter.utils.js";
import {
    ALL_FULL_LANGUAGE_UI_NAMES, FullLanguageUIName,
    LanguageCode, LANGUAGES,
    setFullLanguageName,
} from "../utils/language.utils.js";
import {QuestionsKeysEnum} from "../resources/global/translations.js";
import {
    setDriver,
    setDatabaseName,
    setHostName,
    setUserName,
    setPort,
    setPassword,
    resetDatabase
} from "./set.database.command.js";


export const locateSettings = () => {
    const settingsPath = path.join(__dirname, "dist/.wizgen/settings.json");
    return settingsPath;
}
const prompter = new Prompter();
export const configureSettings = async () => {
    await menu();
};
const makeLanguageObject = (chosenLanguage: LanguageCode) => {
    const fullLanguageName = setFullLanguageName(chosenLanguage);
    const language = {
        fullLanguage: fullLanguageName,
        langCode: chosenLanguage,
    };
    return language;
}
const setLanguage = async () => {
    const chosenLanguage = await prompter.ask(QuestionsKeysEnum.SELECT_LANGUAGE);
    if (!chosenLanguage) {
        console.error("No language chosen");
        return null;
    }

    const settingsPath = locateSettings();
    const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));

    settings.lang = makeLanguageObject(chosenLanguage as LanguageCode);

    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
    console.log(`Language set to ${chosenLanguage}`);

    return chosenLanguage;
};

/**
* Menu to configure the settings
* open a list which will call the question to ask
* when the user has answered all the questions, we save the settings inthe settings.json file
* we need to add a possibility to quit the menu
**/
const menu = async () => {
// ask the user to choose an option
    const options = [ "Language", "Driver", "Host name", "Port", "User name", "Password", "Database name","Empty database", "All", "Quit"];
    const chosenOption = await prompter.ask(QuestionsKeysEnum.SELECT_ACTION, { choices: options });
    switch (chosenOption) {

        case "Language":
            await setLanguage();
            break;
        case "Driver":
            await setDriver();
            console.log("Driver");
            break;
        case "Host name":
            await setHostName();
            console.log("Host name");
            break;
        case "Port":
            await setPort();
            console.log("Port");
            break;
        case "User name":
            await setUserName();
            console.log("User name");
            break;
        case "Password":
            await setPassword();
            console.log("Password");
            break;
        case "Database name":
            await setDatabaseName();
            console.log("Database name");
            break;
        case "Empty database":
            await resetDatabase()
            break;
        case "All":
            await setLanguage();
            await setDriver();
            await setHostName();
            await setPort();
            await setUserName();
            await setPassword();
            await setDatabaseName();
            break;

        case "Quit":
            console.log("Quit");
            break;
        default:
            console.log("default");
            break;
    }

};

