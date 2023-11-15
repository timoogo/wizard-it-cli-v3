type ITranslations = {
  [key in ILang]: {
    questions: {
      [key in QuestionsKeysEnum]: string;
    };
    errors: {
      [key in ErrorMessagesEnum]: string;
    };
    file_management: {
      [key in FileManagementKeysEnum]: string;
    };
  }
}

export type ILang = 'fr' | 'en';

type BaseQuestion = {
  type: string;
  name?: string;
  message: string | ((answers: any) => string | Promise<string>);
  default?: any;
};

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
  SELECT_ACTION = "SELECT_ACTION",
  ENTRY_POINT = "ENTRY_POINT",
  USE_DEFAULT_PROPERTIES = "USE_DEFAULT_PROPERTIES",
  PAGES_TO_GENERATE = "PAGES_TO_GENERATE",
  DEFAULT_VALUE = "DEFAULT_VALUE",
  CONFIRM_DEFAULT_PROPERTIES = "CONFIRM_DEFAULT_PROPERTIES",
  CONFIRM_DELETE_DATABASE = "CONFIRM_DELETE_DATABASE",
  USE_WIZARD_INIT = "USE_WIZARD_INIT"
}

export enum ErrorMessagesEnum {
  INVALID_DRIVER = "INVALID_DRIVER",
  INVALID_LANGUAGE = "INVALID_LANGUAGE",
  INVALID_PORT = "INVALID_PORT",
  INVALID_COLUMN_TYPE = "INVALID_COLUMN_TYPE",
  INVALID_DATABASE_NAME = "INVALID_DATABASE_NAME",
  INVALID_TABLE_NAME = "INVALID_TABLE_NAME",
  INVALID_COLUMN_NAME = "INVALID_COLUMN_NAME",
  CONNECTION_FAILED = "CONNECTION_FAILED",
  QUERY_EXECUTION_FAILED = "QUERY_EXECUTION_FAILED",
  DATABASE_ALREADY_EXISTS = "DATABASE_ALREADY_EXISTS",
  TABLE_ALREADY_EXISTS = "TABLE_ALREADY_EXISTS",
  COLUMN_ALREADY_EXISTS = "COLUMN_ALREADY_EXISTS",
  MISSING_REQUIRED_FIELDS = "MISSING_REQUIRED_FIELDS",
  UNSUPPORTED_OPERATION = "UNSUPPORTED_OPERATION",
  PERMISSION_DENIED = "PERMISSION_DENIED",
  TIMEOUT_ERROR = "TIMEOUT_ERROR",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  ENTITY_DEFINITION_NOT_FOUND = "ENTITY_DEFINITION_NOT_FOUND",
  // Ajoutez d'autres clés d'erreur au besoin
}

export enum FileManagementKeysEnum {
  ALRADY_EXISTS = "ALRADY_EXISTS",
  CREATED = "CREATED",
  DIRECTORY_CREATED = "DIRECTORY_CREATED",
  DIRECTORY_EXISTS = "DIRECTORY_EXISTS",
  NOT_FOUND = "NOT_FOUND",
  DELETED = "DELETED",
  UPDATED = "UPDATED",
  FILE_CREATED = "FILE_CREATED",
  FILE_EXISTS = "FILE_EXISTS",
  FILE_NOT_FOUND = "FILE_NOT_FOUND",
  FILE_DELETED = "FILE_DELETED",
  // Ajoutez d'autres clés au besoin
}

export const translations: ITranslations = {
  fr: {
    questions: {
      [QuestionsKeysEnum.DATABASE_NAME]: "Quel est le nom de la base de données ?",
      [QuestionsKeysEnum.SELECT_DRIVER]: "Quel est le driver de la base de données ?",
      [QuestionsKeysEnum.HOST_NAME]: "Quel est le nom d'hôte ?",
      [QuestionsKeysEnum.USER_NAME]: "Quel est le nom d'utilisateur ?",
      [QuestionsKeysEnum.PORT]: "Quel est le port ?",
      [QuestionsKeysEnum.PASSWORD]: "Quel est le mot de passe ?",
      [QuestionsKeysEnum.ENTITY_NAME]: "Quel est le nom de l'entité ?",
      [QuestionsKeysEnum.GENERATE_TABLE]: "Voulez-vous générer une table ?",
      [QuestionsKeysEnum.TABLE_NAME]: "Quel est le nom de la table ?",
      [QuestionsKeysEnum.COLUMN_NAME]: "Quel est le nom de la colonne ?",
      [QuestionsKeysEnum.COLUMN_TYPE]: "Quel est le type de la colonne ?",
      [QuestionsKeysEnum.IS_PRIMARY]: "Est-ce une clé primaire ?",
      [QuestionsKeysEnum.IS_GENERATED]: "Est-ce une clé générée ?",
      [QuestionsKeysEnum.IS_UNIQUE]: "Est-ce une clé unique ?",
      [QuestionsKeysEnum.IS_NULABLE]: "Est-ce une clé nullable ?",
      [QuestionsKeysEnum.MORE_COLUMNS]: "Voulez-vous ajouter une autre colonne ?",
      [QuestionsKeysEnum.SELECT_LANGUAGE]: "Quel est la langue choisie ?",
      [QuestionsKeysEnum.SCHEMA_FORMAT]: "Quel est le format du schéma ?",
      [QuestionsKeysEnum.SAVE_TO_ZOD]: "Voulez-vous sauvegarder le schéma au format Zod ?",
      [QuestionsKeysEnum.SAVE_TO_JSON]: "Voulez-vous sauvegarder le schéma au format JSON ?",
      [QuestionsKeysEnum.SELECT_ENTITY]: "Quel est l'entité choisie ?",
      [QuestionsKeysEnum.PANEL_NAME]: "Quel est le nom du panneau ?",
      [QuestionsKeysEnum.ENTRY_POINT]: "Quel est le point d'entrée ?",
      [QuestionsKeysEnum.PAGES_TO_GENERATE]: "Quels sont les pages à générer ?",
      [QuestionsKeysEnum.DEFAULT_VALUE]: "Quelle est la valeur par défaut ?",
      [QuestionsKeysEnum.CONFIRM_DEFAULT_PROPERTIES]: "Voulez-vous utiliser les propriétés par défaut ?",
      [QuestionsKeysEnum.CONFIRM_DELETE_DATABASE]: "Voulez-vous supprimer la base de données ?",
      [QuestionsKeysEnum.USE_WIZARD_INIT]: "Voulez-vous utiliser le wizard init ?",
      [QuestionsKeysEnum.SELECT_ACTION]: "Quelle action voulez-vous effectuer ?",
      [QuestionsKeysEnum.USE_DEFAULT_PROPERTIES]: "Voulez-vous utiliser les propriétés par défaut ?"
    }, errors: {
      [ErrorMessagesEnum.INVALID_DRIVER]: "Le driver est invalide",
      [ErrorMessagesEnum.INVALID_LANGUAGE]: "La langue est invalide",
      [ErrorMessagesEnum.INVALID_PORT]: "Le port est invalide",
      [ErrorMessagesEnum.INVALID_COLUMN_TYPE]: "Le type de colonne est invalide",
      [ErrorMessagesEnum.INVALID_DATABASE_NAME]: "Le nom de la base de données est invalide",
      [ErrorMessagesEnum.INVALID_TABLE_NAME]: "Le nom de la table est invalide",
      [ErrorMessagesEnum.INVALID_COLUMN_NAME]: "Le nom de la colonne est invalide",
      [ErrorMessagesEnum.CONNECTION_FAILED]: "La connexion a échoué",
      [ErrorMessagesEnum.QUERY_EXECUTION_FAILED]: "L'exécution de la requête a échoué",
      [ErrorMessagesEnum.DATABASE_ALREADY_EXISTS]: "La base de données existe déjà",
      [ErrorMessagesEnum.TABLE_ALREADY_EXISTS]: "La table existe déjà",
      [ErrorMessagesEnum.COLUMN_ALREADY_EXISTS]: "La colonne existe déjà",
      [ErrorMessagesEnum.MISSING_REQUIRED_FIELDS]: "Les champs requis sont manquants",
      [ErrorMessagesEnum.UNSUPPORTED_OPERATION]: "L'opération n'est pas supportée",
      [ErrorMessagesEnum.PERMISSION_DENIED]: "La permission a été refusée",
      [ErrorMessagesEnum.TIMEOUT_ERROR]: "Le délai d'attente a expiré",
      [ErrorMessagesEnum.UNKNOWN_ERROR]: "L'erreur est inconnue",
      [ErrorMessagesEnum.ENTITY_DEFINITION_NOT_FOUND]: "La définition de l'entité n'a pas été trouvée"
    },
    file_management: {
      [FileManagementKeysEnum.ALRADY_EXISTS]: "Le fichier existe déjà",
      [FileManagementKeysEnum.CREATED]: "Le fichier a été créé avec succès",
      [FileManagementKeysEnum.DIRECTORY_CREATED]: "Le dossier a été créé avec succès",
      [FileManagementKeysEnum.DIRECTORY_EXISTS]: "Le dossier existe déjà",
      [FileManagementKeysEnum.NOT_FOUND]: "Le fichier n'a pas été trouvé",
      [FileManagementKeysEnum.DELETED]: "Le fichier a été supprimé avec succès",
      [FileManagementKeysEnum.UPDATED]: "Le fichier a été mis à jour avec succès",
      [FileManagementKeysEnum.FILE_CREATED]: "Le fichier a été créé avec succès",
      [FileManagementKeysEnum.FILE_EXISTS]: "Le fichier existe déjà",
      [FileManagementKeysEnum.FILE_NOT_FOUND]: "Le fichier n'a pas été trouvé",
      [FileManagementKeysEnum.FILE_DELETED]: "Le fichier a été supprimé avec succès"
    }
  },

  en: {
    questions: {
      DATABASE_NAME: "What is the name of the database?",
      SELECT_DRIVER: "What is the database driver?",
      HOST_NAME: "What is the hostname?",
      USER_NAME: "What is the username?",
      PORT: "What is the port?",
      PASSWORD: "What is the password?",
      ENTITY_NAME: "What is the name of the entity?",
      GENERATE_TABLE: "Do you want to generate a table?",
      TABLE_NAME: "What is the name of the table?",
      COLUMN_NAME: "What is the name of the column?",
      COLUMN_TYPE: "What is the type of the column?",
      IS_PRIMARY: "Is this a primary key?",
      IS_GENERATED: "Is this a generated key?",
      IS_UNIQUE: "Is this a unique key?",
      IS_NULABLE: "Is this a nullable key?",
      MORE_COLUMNS: "Do you want to add another column?",
      SELECT_LANGUAGE: "What is the chosen language?",
      SCHEMA_FORMAT: "What is the schema format?",
      SAVE_TO_ZOD: "Do you want to save the schema in Zod format?",
      SAVE_TO_JSON: "Do you want to save the schema in JSON format?",
      SELECT_ENTITY: "What is the chosen entity?",
      PANEL_NAME: "What is the name of the panel?",
      ENTRY_POINT: "What is the entry point?",
      PAGES_TO_GENERATE: "What pages do you want to generate?",
      DEFAULT_VALUE: "What is the default value?",
      CONFIRM_DEFAULT_PROPERTIES: "Do you want to use the default properties?",
      CONFIRM_DELETE_DATABASE: "Do you want to delete the database?",
      USE_WIZARD_INIT: "Do you want to use the wizard init?",
      SELECT_ACTION: "What action do you want to perform?",
      USE_DEFAULT_PROPERTIES: "Do you want to use the default properties?"
    },
    errors: {
      INVALID_DRIVER: "The driver is invalid",
      INVALID_LANGUAGE: "The language is invalid",
      INVALID_PORT: "The port is invalid",
      INVALID_COLUMN_TYPE: "The column type is invalid",
      INVALID_DATABASE_NAME: "The database name is invalid",
      INVALID_TABLE_NAME: "The table name is invalid",
      INVALID_COLUMN_NAME: "The column name is invalid",
      CONNECTION_FAILED: "Connection failed",
      QUERY_EXECUTION_FAILED: "Query execution failed",
      DATABASE_ALREADY_EXISTS: "The database already exists",
      TABLE_ALREADY_EXISTS: "The table already exists",
      COLUMN_ALREADY_EXISTS: "The column already exists",
      MISSING_REQUIRED_FIELDS: "Missing required fields",
      UNSUPPORTED_OPERATION: "The operation is not supported",
      PERMISSION_DENIED: "Permission denied",
      TIMEOUT_ERROR: "Timeout occurred",
      UNKNOWN_ERROR: "An unknown error occurred",
      ENTITY_DEFINITION_NOT_FOUND: "Entity definition not found"
    },
    file_management: {
      ALRADY_EXISTS: "The file already exists",
      CREATED: "The file has been created successfully",
      DIRECTORY_CREATED: "The directory has been created successfully",
      DIRECTORY_EXISTS: "The directory already exists",
      NOT_FOUND: "The file was not found",
      DELETED: "The file has been deleted successfully",
      UPDATED: "The file has been updated successfully",
      FILE_CREATED: "The file has been created successfully",
      FILE_EXISTS: "The file already exists",
      FILE_NOT_FOUND: "The file was not found",
      FILE_DELETED: "The file has been deleted successfully"
    }
  },

}