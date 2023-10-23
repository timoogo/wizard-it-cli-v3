"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSchemaFromEntityName = exports.listEntities = void 0;
var fs = require("fs");
var WIZGEN_FOLDER = "dist/.wizgen";
var WIZGEN_ENTITY_DEFINITION_FILE = 'entity.definition.json';
var WIZGEN_ENTITY_DEFINITION_FILE_PATH = "".concat(WIZGEN_FOLDER, "/").concat(WIZGEN_ENTITY_DEFINITION_FILE);
function listEntities() {
    // si on peut pas trouver le fichier, on retourne un tableau vide
    if (!fs.existsSync(WIZGEN_ENTITY_DEFINITION_FILE_PATH)) {
        throw new Error("Le fichier ".concat(WIZGEN_ENTITY_DEFINITION_FILE_PATH, " n'existe pas"));
    }
    // Lire le contenu du fichier
    var rawData = fs.readFileSync(WIZGEN_ENTITY_DEFINITION_FILE_PATH, 'utf-8');
    // Analyser le contenu pour obtenir un objet JavaScript
    var entitiesData = JSON.parse(rawData);
    // Extraire les noms des entités (entityName)
    return entitiesData.entities.map(function (entity) { return entity.entityName; });
}
exports.listEntities = listEntities;
function loadSchemaFromEntityName(entityName) {
    // Lire le contenu du fichier
    var rawData = fs.readFileSync(WIZGEN_ENTITY_DEFINITION_FILE_PATH, 'utf-8');
    // Analyser le contenu pour obtenir un objet JavaScript
    var entitiesData = JSON.parse(rawData);
    // trouver l'entité correspondante au nom de l'entité donné en paramètre
    var entity = entitiesData.entities.find(function (entity) { return entity.entityName === entityName; });
    // si on ne trouve pas l'entité, on retourne un tableau vide
    if (!entity) {
        throw new Error('L\'entité n\'existe pas');
    }
    return entity;
}
exports.loadSchemaFromEntityName = loadSchemaFromEntityName;
