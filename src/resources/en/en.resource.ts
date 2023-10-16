import {Questions} from "../../utils/Questions.type.js";
import {listEntities} from "../../utils/entity.utils.js";
import {CRUD, ALL} from "../constants/crud.constant.js";
import {Driver} from "../constants/drivers.constant.js";

export const QUESTIONS: Questions = {
    DATABASE_NAME: {
        message: "What is the database name?",
        type: "input",
        default: "test"
    },
    SELECT_DRIVER: {
        message: "Which driver do you want to use?",
        type: "list",
        choices: [Driver.MYSQL, Driver.POSTGRES, Driver.MARIADB],
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
    SELECT_ACTION: {
        message: "What action do you want to perform?",
        type: "list",
        choices: [],
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
    SELECT_ENTITY: {
        message: "Which entity do you want to generate?",
        type: "list",
        default: "no entity selected",
        choices: listEntities()
    },
    PANEL_NAME: {
        message: "What is the panel name?",
        type: "input",
        default: "test"
    },
    ENTRY_POINT: {
        message: "What is the entry point?",
        type: "input",
        default: "/test"
    },
    PAGES_TO_GENERATE: {
        message: "Which pages do you want to generate?",
        type: "checkbox",
        choices: [...CRUD],
        default: 5
    },
    DEFAULT_VALUE: {
        message: "What is the default value?",
        type: "input",
        default: "null"
    },
    CONFIRM_DEFAULT_PROPERTIES: {
        message: "Are you sure ",
        type: "list",
        default: false,
        choices: ["yes", "no"]

    },
    CONFIRM_DELETE_DATABASE: {
        message: "Are you sure you want to delete the database?",
        type: "list",
        default: false,
        choices: ["yes", "no"]

    }
}

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


export const FILE_MANAGEMENT = {
    ALRADY_EXISTS: " already exists.",
    CREATED: " created successfully.",
    DIRECTORY_CREATED: "Directory",
    DIRECTORY_EXISTS: "Directory already exists.",
    NOT_FOUND: " not found.",
    DELETED: " deleted successfully.",
    UPDATED: " updated successfully.",
    FILE_CREATED: "File created successfully :",
    FILE_EXISTS: "File already exists :",
    FILE_NOT_FOUND: "File not found :",
    FILE_DELETED: "File deleted successfully :"
};