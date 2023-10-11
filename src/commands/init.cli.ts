import * as fs from "fs";
import * as path from "path";

export const init = async () => {
    // Utilisation de __dirname pour obtenir le chemin du fichier en cours d'exécution
    const baseDirectory = path.dirname(__dirname);
    const directoryName = path.join(baseDirectory, '.wizgen'); // Le chemin complet du dossier à créer
    const files = ["settings.json", "entity.definition.json"]

    // log files in directory baseDirectory
    console.log(fs.readdirSync(baseDirectory))
    // Vérifiez si le dossier existe déjà
   /* if (!fs.existsSync(directoryName)) {
        fs.mkdirSync(directoryName); // Créez le dossier s'il n'existe pas
        console.log(`Le dossier ${directoryName} a été créé avec succès.`);
    } else {
        console.log(`Le dossier ${directoryName} existe déjà.`);
    }

    // Vérifiez l'existence de chaque fichier dans le dossier et créez-les s'ils n'existent pas
    for (const file of files) {
        const filePath = path.join(directoryName, file); // Créez le chemin complet vers le fichier
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, '{}'); // Créez le fichier avec un contenu vide
            console.log(`Le fichier ${file} a été créé avec succès dans le dossier ${directoryName}.`);
        } else {
            console.log(`Le fichier ${file} existe déjà dans le dossier ${directoryName}.`);
        }
    }*/
};
