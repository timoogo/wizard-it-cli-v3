import {Questions} from "../../utils/Questions.type.js";
import {listEntities} from "../../utils/entity.utils.js";
import {CRUD, ALL} from "../constants/crud.constant.js";
import {Driver} from "../constants/drivers.constant.js";
import { translations, ILang } from "./translations.js";
import * as settings from "../../.wizgen/settings.json"
export const getQuestions = (): Questions => {
    const lang = settings.default.lang as ILang
    const translatedQuestions =  translations[lang || 'en'].questions
    
    return {
        DATABASE_NAME: {
            message: translatedQuestions.DATABASE_NAME,
            type: "input",
            default: "test"
        },
        SELECT_DRIVER: {
            message: translatedQuestions.SELECT_DRIVER,
            type: "list",
            choices: [Driver.MYSQL, Driver.POSTGRES, Driver.MARIADB],
            default: "MySql"
        },
        HOST_NAME: {
            message: translatedQuestions.HOST_NAME,
            type: "input",
            default: "localhost"
        },
        USER_NAME: {
            message: translatedQuestions.USER_NAME,
            type: "input",
            default: "root"
        },
        PORT: {
            message: translatedQuestions.PORT,
            type: "input",
            default: 3306
        },
        PASSWORD: {
            message: translatedQuestions.PASSWORD,
            type: "password",  // Use "password" to hide the input,
        },
        ENTITY_NAME: {
            message: translatedQuestions.ENTITY_NAME,
            type: "input",
            default: "test"
        },
        GENERATE_TABLE: {
            message: translatedQuestions.GENERATE_TABLE,
            type: "confirm",
            default: true
        },
        TABLE_NAME: {
            message: translatedQuestions.TABLE_NAME,
            type: "input",
            default: "test"
        },
        COLUMN_NAME: {
            message: translatedQuestions.COLUMN_NAME,
            type: "input",
            default: "test"
        },
        COLUMN_TYPE: {
            message: translatedQuestions.COLUMN_TYPE,
            type: "list",
            default: "string",
            choices: ["string", "number", "date", "boolean"] // Add the types you want
        },
        IS_PRIMARY: {
            message: translatedQuestions.IS_PRIMARY,
            type: "list",
            choices: ["yes", "no"],
            default: "yes"
        },
        IS_GENERATED: {
            message: translatedQuestions.IS_GENERATED,
            type: "list",
            choices: ["yes", "no"],
            default: "yes"
        },
        IS_UNIQUE: {
            message: translatedQuestions.IS_UNIQUE,
            type: "list",
            choices: ["yes", "no"],
            default: "yes"
        },
        IS_NULABLE: {
            message: translatedQuestions.IS_NULABLE,
            type: "list",
            choices: ["yes", "no"],
            default: "yes"
        },
        MORE_COLUMNS: {
            message: translatedQuestions.MORE_COLUMNS,
            type: "list",
            choices: ["yes", "no"],
            default: "yes"
        },
        SELECT_LANGUAGE: {
            message: translatedQuestions.SELECT_LANGUAGE,
            type: "list",
            default: "English",
            choices: ["English", "Français"]  // Example of language choices
        },
        SELECT_ACTION: {
            message: translatedQuestions.SELECT_ACTION,
            type: "list",
            choices: [],
        },
        SCHEMA_FORMAT: {
            message: translatedQuestions.SCHEMA_FORMAT,
            type: "list",
            default: "JSON",
            choices: ["JSON", "Zod"]  // Add the formats you want
        },
        SAVE_TO_ZOD: {
            message: translatedQuestions.SAVE_TO_ZOD,
            type: "list",
            choices: ["yes", "no"],
        },
        SAVE_TO_JSON: {
            message: translatedQuestions.SAVE_TO_JSON,
            type: "list",
            choices: ["yes", "no"],
        },
        SELECT_ENTITY: {
            message: translatedQuestions.SELECT_ENTITY,
            type: "list",
            default: "no entity selected",
            choices: ["no entity selected", ...listEntities()]
        },
        PANEL_NAME: {
            message: translatedQuestions.PANEL_NAME,
            type: "input",
            default: "test"
        },
        ENTRY_POINT: {
            message: translatedQuestions.ENTRY_POINT,
            type: "input",
            default: "/test"
        },
        PAGES_TO_GENERATE: {
            message: translatedQuestions.PAGES_TO_GENERATE,
            type: "checkbox",
            choices: [...CRUD],
            default: 5
        },
        DEFAULT_VALUE: {
            message: translatedQuestions.DEFAULT_VALUE,
            type: "input",
            default: "null"
        },
        CONFIRM_DEFAULT_PROPERTIES: {
            message: translatedQuestions.CONFIRM_DEFAULT_PROPERTIES,
            type: "list",
            default: false,
            choices: ["yes", "no", "show"]
    
        },
        CONFIRM_DELETE_DATABASE: {
            message: translatedQuestions.CONFIRM_DELETE_DATABASE,
            type: "list",
            default: false,
            choices: ["yes", "no"]
    
        },
        USE_DEFAULT_PROPERTIES: {
        
            message: translatedQuestions.USE_DEFAULT_PROPERTIES,
            type: "list",
            choices: ["yes", "no"]
        },
        USE_WIZARD_INIT: {
            message: translatedQuestions.USE_WIZARD_INIT,
            type: "list",
            choices: ["yes", "no"]
        },
    }
}