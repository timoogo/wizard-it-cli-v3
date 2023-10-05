  import { Questions } from "../../utils/Questions.type.js";


  export const QUESTIONS: Questions = {
    DATABASE_NAME: {
      message: "What is the database name?",
      type: "input",
      default: "test"
    },
    SELECT_DRIVER: {
      message: "Which driver do you want to use?",
      type: "list",
      choices: ["MySql", "Postgres", "MariaDB"],
      default: "MySql"
    },
    HOST_NAME: {
      message: "What is the host name?",
      type: "input",
      default: "localhost"
    },
    USER_NAME: {
      message: "What is the user name?",
      type: "input",
      default: "root"
    },
    PORT: {
      message: "What is the port?",
      type: "input",
      default: 3306
    },
    PASSWORD: {
      message: "Please enter your password:",
      type: "password",  // Use "password" to hide the input,
  

    },
    ENTITY_NAME: {
      message: "What is the entity name?",
      type: "input",
      default: "test"
    },
    GENERATE_TABLE: {
      message: "Do you want to generate your first table?",
      type: "confirm",
      default: true
    },
    TABLE_NAME: {
      message: "What is the table name?",
      type: "input",
      default: "test"
    },
    COLUMN_NAME: {
      message: "What is the column name?",
      type: "input",
      default: "test"
      
    },
    COLUMN_TYPE: {
      message: "What is the column type?",
      type: "list",
      default: "string",
      choices: ["string", "number", "date", "boolean"] // Add the types you want
    },
    IS_PRIMARY: {
      message: "Is it a primary key?",
      type: "list",
      choices: ["yes", "no"],
      default: "yes"
    },
    IS_GENERATED: {
      message: "Is it a generated column?",
      type: "list",
      choices: ["yes", "no"],
      default: "yes"
    },
    IS_UNIQUE: {
      message: "Is it a unique column?",
      type: "list",
      choices: ["yes", "no"],
      default: "yes"
    },
    IS_NULABLE: {
      message: "Is it a nullable column?",
      type: "list",
      choices: ["yes", "no"],
      default: "yes"
    },
    MORE_COLUMNS: {
      message: "Do you want to add more columns?",
      type: "list",
      choices: ["yes", "no"],
      default: "yes"
    },
    SELECT_LANGUAGE: {
      message: "Which language do you want to use?",
      type: "list",
      default: "English",
      choices: ["English", "Français"]  // Example of language choices
    },
    SCHEMA_FORMAT: {
      message: "In which format do you want to save the schema?",
      type: "list",
      default: "JSON",
      choices: ["JSON", "Zod"]  // Add the formats you want
    },
    SAVE_TO_ZOD: {
      message: "Do you want to save the schema to a Zod file?",
      type: "list",
      choices: ["yes", "no"],
    },

    SAVE_TO_JSON: {
      message: "Do you want to save the entity to a JSON file?",
      type: "list",
      choices: ["yes", "no"],
    },
    DEFAULT_VALUE: {
      message: "What is the default value?",
      type: "input",
      default: null
    },

  }
  export type QuestionKeys = keyof typeof QUESTIONS;
    export const ERROR_MESSAGES = {
      INVALID_DRIVER: "The specified driver is not supported.",
      INVALID_LANGUAGE: "The specified language is not supported.",
      INVALID_PORT: "The specified port is invalid.",
      INVALID_COLUMN_TYPE: "The specified column type is invalid.",
      INVALID_DATABASE_NAME: "The specified database name is invalid.",
      INVALID_TABLE_NAME: "The specified table name is invalid.",
      INVALID_COLUMN_NAME: "The specified column name is invalid.",
      CONNECTION_FAILED: "Failed to connect to the database.",
      QUERY_EXECUTION_FAILED: "Query execution failed.",
      DATABASE_ALREADY_EXISTS: "The specified database already exists.",
      TABLE_ALREADY_EXISTS: "The specified table already exists.",
      COLUMN_ALREADY_EXISTS: "The specified column already exists in the table.",
      MISSING_REQUIRED_FIELDS: "Required fields are missing.",
      UNSUPPORTED_OPERATION: "The requested operation is not supported.",
      PERMISSION_DENIED: "Permission denied for this operation.",
      TIMEOUT_ERROR: "The query timed out.",
      UNKNOWN_ERROR: "An unknown error occurred.",
      // ... add other error messages as needed
    };
    
    