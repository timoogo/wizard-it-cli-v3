import fs from 'fs';
import path from 'path';
import { FileManagementKeysEnum} from "../resources/global/translations.js";
import {
    getSystemLanguage,
    getTranslation, 
    setLangToSystem,
} from "../utils/language.utils.js"

export const init = async () => {
    setLangToSystem(); // Définit la langue courante sur la langue système
    const currentLang = getSystemLanguage().langCode; // Récupère la langue système


    const directoryName = "dist/.wizgen";
    const files = ["settings.json", "entity.definition.json"];

    if (!fs.existsSync(directoryName)) {
        fs.mkdirSync(directoryName, { recursive: true });
    }

    for (const file of files) {
        const filePath = path.join(directoryName, file);
        let fileContent = "";

        switch (file) {
            case "settings.json":
                const settings = {
                    lang: {
                        fullLanguage: currentLang,
                        langCode: currentLang,
                    }
                };
                fileContent = JSON.stringify(settings, null, 2);
                break;

            case "entity.definition.json":
                fileContent = "{}";
                break;

            // Ajoutez d'autres cas si nécessaire
        }

        try {
            fs.writeFileSync(filePath, fileContent);
            const successMessageKey = FileManagementKeysEnum.FILE_CREATED;
            const successMessage = getTranslation(currentLang, "file_management", successMessageKey as string);

            console.log(`${successMessage} : ${filePath}`); // Formate et affiche le message de succès
        } catch (error) {
            console.error(`Error creating file ${filePath}: ${error}`);
        }
    }
};
