import * as fs from 'fs';
import { ColumnDetails } from './Column.details.interface.js';
import {Entity} from "../commands/generate/utils.cli.js";


import {createEntityDefinition} from "../commands/generate.cli.js";
import {WIZGEN_ENTITY_DEFINITION_FILE_PATH} from "../resources/constants/utils.constant.js";

export function listEntities() {


    // si on peut pas trouver le fichier, on retourne un tableau vide
    if (!fs.existsSync(WIZGEN_ENTITY_DEFINITION_FILE_PATH)) {
        createEntityDefinition();
    }

    // Lire le contenu du fichier
    const rawData = fs.readFileSync(WIZGEN_ENTITY_DEFINITION_FILE_PATH, 'utf-8');
    // Analyser le contenu pour obtenir un objet JavaScript
    const entitiesData = JSON.parse(rawData);
    // Extraire les noms des entités (entityName)
    return entitiesData.entities?.map((entity: Entity) => entity.entityName);
}


export function loadSchemaFromEntityName(entityName: string | undefined | null) {
    // Lire le contenu du fichier
    const rawData = fs.readFileSync(WIZGEN_ENTITY_DEFINITION_FILE_PATH, 'utf-8');

    // Analyser le contenu pour obtenir un objet JavaScript
    const entitiesData = JSON.parse(rawData);

    // trouver l'entité correspondante au nom de l'entité donné en paramètre
    const entity = entitiesData.entities.find((entity: Entity) => entity.entityName === entityName);

    // si on ne trouve pas l'entité, on retourne un tableau vide
    if (!entity) {
        throw new Error('L\'entité n\'existe pas');
    }
    return entity;

}   