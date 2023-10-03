import { Questions } from "../../utils/Questions.type.js";


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
  SELECT_LANGUAGE: {
    message: "Quelle langue souhaitez-vous utiliser?",
    type: "list",
    choices: ["English", "Français"],  // Exemple de choix de langues
    default: "English"
  },
  SAVE_TO_JSON: {
    message: "Voulez-vous enregistrer dans un fichier JSON?",
    type: "confirm",
    default: true
  
   }
  // ... autres questions
} as const;
export type QuestionKeys = keyof typeof QUESTIONS;