import { Questions } from "../../utils/Questions.type.js";
import { listEntities } from "../../utils/entity.utils.js";
import {CRUD, ALL} from "../constants/crud.constant.js";
import {Driver} from "../constants/drivers.constant.js";

export const QUESTIONS: Questions = {
  DATABASE_NAME: {
    message: "Quel est le nom de la base de données?",
    type: "input",
    default: "test"
  },
  SELECT_DRIVER: {
    message: "Quel driver souhaitez-vous utiliser?",
    type: "list",
    choices: ["MySql", "Postgres", "MariaDB"],
    default: "MySql"
  },
  HOST_NAME: {
    message: "Quel est le nom de l'hôte?",
    type: "input",
    default: "localhost"
  },
  USER_NAME: {
    message: "Quel est le nom d'utilisateur?",
    type: "input",
    default: "root"
  },
  PORT: {
    message: "Quel est le port?",
    type: "input",
    default: 3306
  },
  PASSWORD: {
    message: "Veuillez entrer votre mot de passe:",
    type: "password",  // Utilisez "password" pour masquer la saisie
    
  },
  ENTITY_NAME: {
    message: "Quel est le nom de l'entité?",
    type: "input",
    default: "test"
  },
  GENERATE_TABLE: {
    message: "Voulez-vous générer votre première table?",
    type: "confirm",
    default: true
  },
  TABLE_NAME: {
    message: "Quel est le nom de la table?",
    type: "input",
    default: "test"
  },
  COLUMN_NAME: {
    message: "Quel est le nom de la colonne?",
    type: "input",
    default: "test"
  },
  COLUMN_TYPE: {
    message: "Quel est le type de la colonne?",
    type: "list",
    choices: ["string", "number", "date", "boolean"], // Ajoutez les types que vous souhaitez
    default: "string"
    },
    IS_PRIMARY: {
      message: "Est-ce une clé primaire?",
      type: "confirm",
      default: false
    },
    IS_GENERATED: {
      message: "Est-ce une colonne générée?",
      type: "confirm",
      default: false
    },
    IS_UNIQUE: {
      message: "Est-ce une colonne unique?",
      type: "confirm",
      default: false
    },
    IS_NULABLE: {
      message: "Est-ce une colonne nullable?",
      type: "confirm",
      default: false
    },
  MORE_COLUMNS: {
    message: "Voulez-vous ajouter une autre colonne?",
    type: "confirm",
    default: false
  },
  SELECT_ACTION: {
    message: "Quelle action souhaitez-vous effectuer?",
    type: "list",
    choices: [],
  },

  SELECT_LANGUAGE: {
    message: "Quelle langue souhaitez-vous utiliser?",
    type: "list",
    choices: ["English", "Français"],  // Exemple de choix de langues
    default: "English"
  },
  SCHEMA_FORMAT: {
    message: "Quel est le nom du schéma?",
    type: "list",
    choices: ["JSON", "zod"],
    default: "test"
  },
  SAVE_TO_ZOD: {
    message: "Voulez-vous enregistrer dans un fichier zod?",
    type: "confirm",
    default: true
  },
  SAVE_TO_JSON: {
    message: "Voulez-vous enregistrer dans un fichier JSON?",
    type: "confirm",
    default: true
  
  },
   SELECT_ENTITY: {
    message: "Quelle entité souhaitez-vous générer?",
    type: "list",
    choices: listEntities(),
    default: "no entity selected"
   },
   PANEL_NAME: {
    message: "Quel est le nom du panel?",
    type: "input",
    default: "test"
  },
  ENTRY_POINT: {
    message: "Quel est le point d'entrée?",
    type: "input",
    default: "test"
  },
  PAGES_TO_GENERATE: {
    message: "Quelles pages souhaitez-vous générer?",
    type: "checkbox",
    choices: ["index", "create", "edit", "show", "delete", "all" ],
    default: ["index", "create", "edit", "show", "delete", "all"]
  },  

   DEFAULT_VALUE: {
    message: "Quelle est la valeur par défaut?",
    type: "input",
    default: "test"
  },

  // ... autres questions
} as const;

export enum QuestionsKeysEnum {
  DATABASE_NAME = "DATABASE_NAME",
  SELECT_DRIVER = "SELECT_DRIVER",
  HOST_NAME = "HOST_NAME",
  USER_NAME = "USER_NAME",
  PORT = "PORT",
  PASSWORD = "PASSWORD",
  ENTITY_NAME = "ENTITY_NAME",
  GENERATE_TABLE = "GENERATE_TABLE",
  TABLE_NAME = "TABLE_NAME",
  COLUMN_NAME = "COLUMN_NAME",
  COLUMN_TYPE = "COLUMN_TYPE",
  IS_PRIMARY = "IS_PRIMARY",
  IS_GENERATED = "IS_GENERATED",
  IS_UNIQUE = "IS_UNIQUE",
  IS_NULABLE = "IS_NULABLE",
  MORE_COLUMNS = "MORE_COLUMNS",
  SELECT_LANGUAGE = "SELECT_LANGUAGE",
  SCHEMA_FORMAT = "SCHEMA_FORMAT",
  SAVE_TO_ZOD = "SAVE_TO_ZOD",
  SAVE_TO_JSON = "SAVE_TO_JSON",
  SELECT_ENTITY = "SELECT_ENTITY",
  PANEL_NAME = "PANEL_NAME",
  ENTRY_POINT = "ENTRY_POINT",
  PAGES_TO_GENERATE = "PAGES_TO_GENERATE",
  DEFAULT_VALUE = "DEFAULT_VALUE",
  CONFIRM_DEFAULT_PROPERTIES = "CONFIRM_DEFAULT_PROPERTIES",
  CONFIRM_DELETE_DATABASE = "CONFIRM_DELETE_DATABASE",
}


export type QuestionKeys = keyof typeof QUESTIONS;


export const ERROR_MESSAGES = {
  INVALID_DRIVER: "Le driver n'est pas valide",
  INVALID_LANGUAGE: "La langue n'est pas valide",
  INVALID_PORT: "Le port n'est pas valide",
  INVALID_COLUMN_TYPE: "Le type de colonne n'est pas valide",
  INVALID_DATABASE_NAME : "Le nom de la base de données n'est pas valide",
  INVALID_TABLE_NAME  : "Le nom de la table n'est pas valide",
  INVALID_COLUMN_NAME : "Le nom de la colonne n'est pas valide",
  CONNECTION_FAILED : "La connexion à la base de données a échoué",
  QUERY_EXECUTION_FAILED  : "L'exécution de la requête a échoué",
  DATABASE_ALREADY_EXISTS : "La base de données existe déjà",
  TABLE_ALREADY_EXISTS : "La table existe déjà",
  COLUMN_ALREADY_EXISTS : "La colonne existe déjà",
  MISSING_REQUIRED_FIELDS : "Des champs obligatoires sont manquants",
  UNSUPPORTED_OPERATION : "L'opération demandée n'est pas supportée",
  PERMISSION_DENIED : "Permission refusée pour cette opération",
  TIMEOUT_ERROR : "La requête a expiré",
  UNKNOWN_ERROR : "Une erreur inconnue s'est produite",

}
export const FILE_MANAGEMENT = {
  ALREADY_EXISTS: " existe déjà",
  CREATED: " a été créé",
    DIRECTORY_CREATED: "Le dossier",
    DIRECTORY_EXISTS: "Le dossier existe déjà",
    FILE_CREATED: "Le fichier",
    FILE_EXISTS: "Le fichier existe déjà",
    DELETED: " a été supprimé",
    NOT_FOUND: " n'a pas été trouvé",
    NOT_DELETED: " n'a pas été supprimé",
    NOT_UPDATED: " n'a pas été mis à jour",
    UPDATED: " a été mis à jour",
    NOT_CREATED: " n'a pas été créé",
    NOT_SAVED: " n'a pas été enregistré",
    SAVED: " a été enregistré",
    NOT_READ: " n'a pas été lu",
    READ: " a été lu",
    NOT_GENERATED: " n'a pas été généré",
    GENERATED: " a été généré",
    NOT_CONNECTED: " n'a pas été connecté",
    CONNECTED: " a été connecté",

}