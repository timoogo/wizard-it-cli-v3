"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDb = void 0;
var child_process_1 = require("child_process");
var generateDb = function () {
    try {
        console.log('Génération du fichier de migration...');
        (0, child_process_1.execSync)('prisma migrate dev --name init', { stdio: 'inherit' });
        console.log('La base de données a été générée avec succès.');
    }
    catch (error) {
        console.error('Erreur lors de la génération de la base de données:', error);
    }
};
exports.generateDb = generateDb;
