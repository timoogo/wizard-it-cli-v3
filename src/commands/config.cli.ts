import * as fs from "fs";
import * as path from "path";

export const config = async () => {
    const pathToSettingsFile = "dist/settings.json" 

    // Vérifiez si le dossier  et le fichier existe déjà
    if (!fs.existsSync(pathToSettingsFile)) {
        console.log(`Le fichier ${pathToSettingsFile} n'existe pas.`);
        // créer un json vide 
        const newJSON = {}
        fs.writeFileSync(pathToSettingsFile, newJSON as string ); // Créez le fichier avec un contenu vide
        console.log(`Le fichier ${pathToSettingsFile} a été créé avec succès.`);
        return;
    }

    

};
