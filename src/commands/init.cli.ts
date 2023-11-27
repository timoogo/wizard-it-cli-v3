import fs from 'fs';
import path from 'path';
import { FileManagementKeysEnum} from "../resources/global/translations.js";
import {
    DEFAULT_LOCALE,
    getCurrentLang,
    getSystemLanguage,
    getTranslation, LanguageCode, setCurrentLang, setFullLanguageName,
    setLangToSystem,
} from "../utils/language.utils.js"

export const init = async () => {
    setLangToSystem(); // Définit la langue courante sur la langue système
    const currentLang = getSystemLanguage().langCode; // Récupère la langue système
    const systemLanguage = process.env.LANG || currentLang;
    const langCode = systemLanguage.includes(DEFAULT_LOCALE) ? LanguageCode.EN : LanguageCode.FR;



    const directoryName = "dist/.wizgen";
    const files = ["settings.json", "entity.definition.json"];

    if (!fs.existsSync(directoryName)) {
        fs.mkdirSync(directoryName, { recursive: true });
    }

    for (const file of files) {
        const filePath = path.join(directoryName, file);
        let fileContent: Object = "";

        switch (file) {
            case "settings.json":
                let fullLanguageName = setFullLanguageName(currentLang);
                const settings = {
                    lang: {
                        fullLanguage: fullLanguageName,
                        langCode: langCode, // Utilisez "langCode" ici au lieu de "currentLang"
                    },
                    database: {
                        driver: null,
                        hostName: null,
                        port: null,
                        databaseName: null,
                        userName: null,
                        password: null,
                    }
                };
                fileContent = JSON.stringify(settings, null, 2);
                break;

            case "entity.definition.json":
                fileContent = `{}`
                break;

            // Ajoutez d'autres cas si nécessaire
        }

        try {
            fs.writeFileSync(filePath, fileContent as string);
            const successMessageKey = FileManagementKeysEnum.FILE_CREATED;
            const successMessage = getTranslation(currentLang, "file_management", successMessageKey as string);

            console.log(`${successMessage} : ${filePath}`); // Formate et affiche le message de succès
        } catch (error) {
            console.error(`Error creating file ${filePath}: ${error}`);
        }
    }
};
