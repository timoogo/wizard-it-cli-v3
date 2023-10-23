"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FILE_MANAGEMENT = exports.ERROR_MESSAGES = exports.QuestionsKeysEnum = exports.QUESTIONS = void 0;
var entity_utils_js_1 = require("../../utils/entity.utils.js");
var crud_constant_js_1 = require("../constants/crud.constant.js");
var drivers_constant_js_1 = require("../constants/drivers.constant.js");
exports.QUESTIONS = {
    DATABASE_NAME: {
        message: "What is the database name?",
        type: "input",
        default: "test"
    },
    SELECT_DRIVER: {
        message: "Which driver do you want to use?",
        type: "list",
        choices: [drivers_constant_js_1.Driver.MYSQL, drivers_constant_js_1.Driver.POSTGRES, drivers_constant_js_1.Driver.MARIADB],
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
        type: "password", // Use "password" to hide the input,
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
        choices: ["English", "Français"] // Example of language choices
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
        choices: ["JSON", "Zod"] // Add the formats you want
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
        choices: __spreadArray([], (0, entity_utils_js_1.listEntities)(), true)
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
        choices: __spreadArray([], crud_constant_js_1.CRUD, true),
        default: 5
    },
    DEFAULT_VALUE: {
        message: "What is the default value?",
        type: "input",
        default: "null"
    },
    CONFIRM_DEFAULT_PROPERTIES: {
        message: "Do you want to use the default properties?",
        type: "list",
        default: false,
        choices: ["yes", "no"]
    },
    CONFIRM_DELETE_DATABASE: {
        message: "Are you sure you want to delete the database?",
        type: "list",
        default: false,
        choices: ["yes", "no"]
    },
    USE_DEFAULT_PROPERTIES: {
        message: "Do you want to use the default properties?",
        type: "list",
        choices: ["yes", "no"]
    }
};
var QuestionsKeysEnum;
(function (QuestionsKeysEnum) {
    QuestionsKeysEnum["DATABASE_NAME"] = "DATABASE_NAME";
    QuestionsKeysEnum["SELECT_DRIVER"] = "SELECT_DRIVER";
    QuestionsKeysEnum["HOST_NAME"] = "HOST_NAME";
    QuestionsKeysEnum["USER_NAME"] = "USER_NAME";
    QuestionsKeysEnum["PORT"] = "PORT";
    QuestionsKeysEnum["PASSWORD"] = "PASSWORD";
    QuestionsKeysEnum["ENTITY_NAME"] = "ENTITY_NAME";
    QuestionsKeysEnum["GENERATE_TABLE"] = "GENERATE_TABLE";
    QuestionsKeysEnum["TABLE_NAME"] = "TABLE_NAME";
    QuestionsKeysEnum["COLUMN_NAME"] = "COLUMN_NAME";
    QuestionsKeysEnum["COLUMN_TYPE"] = "COLUMN_TYPE";
    QuestionsKeysEnum["IS_PRIMARY"] = "IS_PRIMARY";
    QuestionsKeysEnum["IS_GENERATED"] = "IS_GENERATED";
    QuestionsKeysEnum["IS_UNIQUE"] = "IS_UNIQUE";
    QuestionsKeysEnum["IS_NULABLE"] = "IS_NULABLE";
    QuestionsKeysEnum["MORE_COLUMNS"] = "MORE_COLUMNS";
    QuestionsKeysEnum["SELECT_LANGUAGE"] = "SELECT_LANGUAGE";
    QuestionsKeysEnum["SCHEMA_FORMAT"] = "SCHEMA_FORMAT";
    QuestionsKeysEnum["SAVE_TO_ZOD"] = "SAVE_TO_ZOD";
    QuestionsKeysEnum["SAVE_TO_JSON"] = "SAVE_TO_JSON";
    QuestionsKeysEnum["SELECT_ENTITY"] = "SELECT_ENTITY";
    QuestionsKeysEnum["PANEL_NAME"] = "PANEL_NAME";
    QuestionsKeysEnum["ENTRY_POINT"] = "ENTRY_POINT";
    QuestionsKeysEnum["PAGES_TO_GENERATE"] = "PAGES_TO_GENERATE";
    QuestionsKeysEnum["DEFAULT_VALUE"] = "DEFAULT_VALUE";
    QuestionsKeysEnum["CONFIRM_DEFAULT_PROPERTIES"] = "CONFIRM_DEFAULT_PROPERTIES";
    QuestionsKeysEnum["CONFIRM_DELETE_DATABASE"] = "CONFIRM_DELETE_DATABASE";
})(QuestionsKeysEnum || (exports.QuestionsKeysEnum = QuestionsKeysEnum = {}));
exports.ERROR_MESSAGES = {
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
exports.FILE_MANAGEMENT = {
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
