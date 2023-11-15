import {Prompter} from "../../utils/prompter.utils.js";
import {ColumnDetails} from "../../utils/Column.details.interface.js";
import {DEFAULT_PROPERTIES} from "../../utils/default.properties.js";
import fs from "fs";
import {WIZGEN_ENTITY_DEFINITION_FILE_PATH, WIZGEN_FOLDER} from "../../resources/constants/utils.constant.js";
import path from "path";
import { QuestionsKeysEnum } from "../../resources/global/translations.js";


export interface EntityDefinition {
    entities: Entity[];
    version?: number;
}

export interface Entity {
    entityName: string;
    columns: ColumnDetails[];
}
export const useDefaultProperties = async (prompter: Prompter): Promise<ColumnDetails[]> => {
    const useDefaults = await prompter.ask(QuestionsKeysEnum.CONFIRM_DEFAULT_PROPERTIES) === 'yes';
    if (useDefaults) {
        return Object.values(DEFAULT_PROPERTIES).filter(prop => prop !== null && prop !== undefined) as ColumnDetails[];
    }
    return [];
};


export const getColumnDetails = async (prompter: Prompter): Promise<ColumnDetails[]> => {
    let columns: ColumnDetails[] = [];
    let addMoreColumns = true;

    while (addMoreColumns) {
        const columnName = await prompter.ask(QuestionsKeysEnum.COLUMN_NAME);

        if (columnName && DEFAULT_PROPERTIES.hasOwnProperty(columnName)) {
            const columnProperty = DEFAULT_PROPERTIES[columnName];
            if (columnProperty) {
                columns.push(columnProperty as ColumnDetails);
            }
        } else {
            const columnType = await prompter.ask(QuestionsKeysEnum.COLUMN_TYPE);
            const isPrimary = await prompter.ask(QuestionsKeysEnum.IS_PRIMARY) === 'yes';
            const isGenerated = await prompter.ask(QuestionsKeysEnum.IS_GENERATED) === 'yes';
            const isUnique = await prompter.ask(QuestionsKeysEnum.IS_UNIQUE) === 'yes';
            const isNullable = await prompter.ask(QuestionsKeysEnum.IS_NULABLE) === 'yes';

            columns.push(<ColumnDetails>{
                columnName: columnName,
                type: columnType,
                isPrimary,
                isGenerated,
                isUnique,
                nullable: isNullable,
                default: ""
            });
        }

        addMoreColumns = await prompter.ask(QuestionsKeysEnum.MORE_COLUMNS) === 'yes';
    }

    return columns;
};

export const saveEntityDefinition = async (data: EntityDefinition, filePath: string): Promise<void> => {
    try {
        // Ensure directory exists
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Save the file
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
        console.log(`Entity saved successfully at ${filePath}`);
    } catch (error) {
        console.error("Failed to save entity definition:", error);
    }
};

