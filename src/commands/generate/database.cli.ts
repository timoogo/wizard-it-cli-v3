import {execSync} from "child_process";

export const generateDb = () => {
    try {
        console.log('Génération du fichier de migration...');
        execSync('prisma migrate dev --name init', { stdio: 'inherit' });

        console.log('La base de données a été générée avec succès.');
    } catch (error) {
        console.error('Erreur lors de la génération de la base de données:', error);
    }
};