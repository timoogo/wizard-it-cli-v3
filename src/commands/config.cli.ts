import * as fs from "fs";
import * as path from "path";
import {WIZGEN_SETTINGS_FILE_PATH, __dirname, directoryName} from "../resources/constants/utils.constant.js";
import { Prompter} from "../utils/prompter.utils.js";
import {getCurrentLang, Language, LANGUAGES,} from "../utils/language.utils.js";

import { QUESTIONS as EN_QUESTIONS, QUESTIONS } from "../resources/en/en.resource.js";


import inquirer from "inquirer";
import { QuestionsKeysEnum } from "../resources/global/translations.js";

const locateSettings = () => {
    const settingsPath = path.join(__dirname, "src/.wizgen/settings.json");
    return settingsPath;
}
const prompter = new Prompter();
export const configureSettings = async () => {
    const chosenLanguage = await setLanguage();
    menu()
};

const setLanguage = async () => {
    // on demande à l'utilisateur de choisir une langue
    const chosenLanguage = await prompter.ask('SELECT_LANGUAGE', {
        message: QuestionsKeysEnum.SELECT_LANGUAGE,
        choices: LANGUAGES,
    });
    // ouverture du fichier settings.json
    const settingsPath = locateSettings();
    const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
    
    // on modifie la langue
     // Assurez-vous que cette mise à jour correspond à la structure de votre settings.json
    settings.lang = chosenLanguage;
    
    // on sauvegarde les modifications
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
    // on avise l'utilisateur que la langue a été modifiée
    console.log(`Language set to ${chosenLanguage}`);

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

