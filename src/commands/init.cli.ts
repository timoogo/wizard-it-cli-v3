import * as fs from "fs";
import * as path from "path";
import {__dirname, directoryName} from "../resources/constants/utils.constant.js";
import { FILE_MANAGEMENT } from "../resources/en/en.resource.js";

export const init = async () => {



    // Utilisation de __dirname pour obtenir le chemin du fichier en cours d'exécution

    const files = ["settings.json", "entity.definition.json"]

    // Vérifiez si le dossier existe déjà
 if (!fs.existsSync(directoryName)) {
        fs.mkdirSync(directoryName); // Créez le dossier s'il n'existe pas
        console.log(`${FILE_MANAGEMENT.DIRECTORY_CREATED} ${directoryName}.`)
    } else {
        console.log(`${FILE_MANAGEMENT.DIRECTORY_EXISTS} ${directoryName}`);
    }

    // Vérifiez l'existence de chaque fichier dans le dossier et créez-les s'ils n'existent pas
    for (const file of files) {
        const filePath = path.join(directoryName, file); // Créez le chemin complet vers le fichier
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, '{}'); // Créez le fichier avec un contenu vide
            console.log(`${FILE_MANAGEMENT.FILE_CREATED} ${file}`);
        } else {
            console.log(`${FILE_MANAGEMENT.FILE_EXISTS} ${file}`);
        }
    }
};
