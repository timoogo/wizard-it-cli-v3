import * as fs from 'fs';
import { ColumnDetails } from './Column.details.interface.js';

const WIZGEN_FOLDER = "dist/.wizgen";
const WIZGEN_ENTITY_DEFINITION_FILE = 'entity.definition.json';
const WIZGEN_ENTITY_DEFINITION_FILE_PATH = `${WIZGEN_FOLDER}/${WIZGEN_ENTITY_DEFINITION_FILE}`;
export function listEntities() {

    // si on peut pas trouver le fichier, on retourne un tableau vide
    if (!fs.existsSync(WIZGEN_ENTITY_DEFINITION_FILE_PATH)) {
        throw new Error(`Le fichier ${WIZGEN_ENTITY_DEFINITION_FILE_PATH} n'existe pas`);
    }
    // Lire le contenu du fichier
    const rawData = fs.readFileSync(WIZGEN_ENTITY_DEFINITION_FILE_PATH, 'utf-8');
    
    // Analyser le contenu pour obtenir un objet JavaScript
    const entitiesData = JSON.parse(rawData);
    
    // Extraire les noms des entités
    return entitiesData.entities.map((entity: ColumnDetails) => entity.columnName);
}

export function loadSchemaFromEntityName(entityName: string | undefined | null) {
    // Lire le contenu du fichier
    const rawData = fs.readFileSync(WIZGEN_ENTITY_DEFINITION_FILE_PATH, 'utf-8');

    // Analyser le contenu pour obtenir un objet JavaScript
    const entitiesData = JSON.parse(rawData);

    // trouver l'entité correspondante au nom de l'entité donné en paramètre
    const entity = entitiesData.entities.find((entity: ColumnDetails) => entity.columnName === entityName);

    // si on ne trouve pas l'entité, on retourne un tableau vide
    if (!entity) {
        throw new Error('L\'entité n\'existe pas');
    }
    return entity;

}   