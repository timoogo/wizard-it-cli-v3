import * as fs from "fs";
import * as path from "path";
import {__dirname, directoryName} from "../resources/constants/utils.constant.js";
import { Prompter} from "../utils/prompter.utils.js";
import {getCurrentLang, Language, LANGUAGES,} from "../utils/language.utils.js";

import { QUESTIONS as EN_QUESTIONS } from "../resources/en/en.resource.js";
import { QUESTIONS as FR_QUESTIONS } from "../resources/fr/fr.resource.js";

import inquirer from "inquirer";


const prompter = new Prompter();
export const configureSettings = async () => {
    // Locate settings.json
    const settingsPath = path.join(__dirname, "src/.wizgen/settings.json");
    // Read the file
    const content = fs.readFileSync(settingsPath, 'utf-8');
    // Parse the file
    const data = JSON.parse(content);
    console.log(data);
    menu()
};

const setLanguage = async () => {
    // Ask the user to choose a language
    const chosenLanguage = await prompter.ask('SELECT_LANGUAGE', {
        default: getCurrentLang()
    });
    //

    return chosenLanguage; // Assuming the 'name' property in the question is 'language'
};


/**
 * Menu to configure the settings
 * open a list which will call the question to ask
 * when the user has answered all the questions, we save the settings inthe settings.json file
 * we need to add a possibility to quit the menu
 **/
const menu = async () => {
    let currentLang: Language = getCurrentLang();
    while (true) {
        // if (currentLang === Language.EN) {
        const UIChoices = ["Set Language", "Exit"];
    //} else {
    //    const UIChoices = ["Changer la langue", "Quitter"];
        const action = await prompter.ask('SELECT_ACTION', {
            message: "Please select an option:",
            choices: UIChoices,
        });

        switch (action) {  // Use the response directly
            case 'Set Language':
                await setLanguage();
                break;
            case 'Exit':
                return;
        }
    }
};

