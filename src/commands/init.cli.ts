import fs from 'fs';
import path from 'path';
import { directoryName } from '../resources/constants/utils.constant.js';
import { FILE_MANAGEMENT } from '../resources/en/en.resource.js';
import { get } from 'http';
import { getSystemLanguage} from "../utils/language.utils.js"

export const init = async () => {
    const directoryName = "dist/.wizgen"; // Le nom du dossier à créer
    const files = ["settings.json", "entity.definition.json"]

    // Vérifiez si le dossier existe déjà
    if (!fs.existsSync(directoryName)) {
        fs.mkdirSync(directoryName); // Créez le dossier s'il n'existe pas
        console.log(`Le dossier ${directoryName} a été créé avec succès.`);
    } else {
        console.log(`Le dossier ${directoryName} existe déjà.`);
    }

    // Vérifiez l'existence de chaque fichier dans le dossier et créez-les s'ils n'existent pas
    for (const file of files) {
        const filePath = path.join(directoryName, file); // Créez le chemin complet vers le fichier
        if (!fs.existsSync(filePath)) {
            let content = {};
    
            switch (file) {
                case "settings.json":
                    content = {
                        lang: getSystemLanguage(), // Contenu spécifique pour settings.json
                    };
                    break;
                case "entity.definition.json":
                    content = {
                        entities: [], // Contenu initial pour entity.definition.json
                        version: "1.0" // Vous pouvez définir la version ici
                    };
                    break;
                // Ajoutez d'autres cas ici pour d'autres fichiers si nécessaire
                default:
                    // Actions par défaut pour les autres fichiers
                    break;
            }
    
            fs.writeFileSync(filePath, JSON.stringify(content, null, 2)); // Créez le fichier avec le contenu spécifié, formaté de manière lisible
            console.log(`Le fichier ${file} a été créé avec succès dans le dossier ${directoryName}.`);
        } else {
            console.log(`Le fichier ${file} existe déjà dans le dossier ${directoryName}.`);
        }
    }
    
}
