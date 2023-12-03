import {Prompter} from "../../utils/prompter.utils.js";
import {ColumnDetails} from "../../utils/Column.details.interface.js";
import {DEFAULT_PROPERTIES} from "../../utils/default.properties.js";
import fs from "fs";
// fs promisified
import * as fsp from 'fs/promises';
import readline from "readline";
import {WIZGEN_ENTITY_DEFINITION_FILE_PATH, WIZGEN_FOLDER} from "../../resources/constants/utils.constant.js";
import path from "path";
import { QuestionsKeysEnum } from "../../resources/global/translations.js";
import pluralize from "pluralize";

import { appendFileSync } from "fs";
import { formatter } from "../../../prisma/formatter.js";

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


/**
 *  Choisir une entité à partir d'un fichier de définition d'entité et la modifier
**/
export const loadSchemaFromEntityName = async () => {
    try {
        // 1. Ouvrir le fichier schema.prisma
        const schema = await fsp.readFile('prisma/schema.prisma', 'utf8');

        // 2. Liste des entités (modèles Prisma)
        const entities: string[] = schema.split('\n')
            .filter((line: string) => line.startsWith('model '))
            .map((modelLine: string) => {
                const parts = modelLine.split(' ');
                return parts.length > 1 ? parts[1] : undefined;
            }).filter((name): name is string => !!name);

        // 3. Demander à l'utilisateur de choisir une entité
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        console.log('Entités disponibles :', entities.join(', '));
        const chosenEntity: string = await new Promise<string>((resolve) => {
            rl.question('Choisissez une entité : ', (answer: string) => {
                resolve(answer);
            });
        });
        rl.close();

        // 4. Récupérer le schéma de l'entité choisie
        const entitySchemaStart: number = schema.indexOf(`model ${chosenEntity} {`);
        const entitySchemaEnd: number = schema.indexOf('}', entitySchemaStart) + 1;
        const entitySchema: string = schema.substring(entitySchemaStart, entitySchemaEnd);

        // 5. Renvoyer le schéma de l'entité choisie
        return entitySchema;
    } catch (error) {
        console.error('Une erreur est survenue :', (error as Error).message);
        return null;
    }
};


export const listEntities = async () => {
    const prompter = new Prompter();

    // Attendre la réponse de `prompter.chooseEntity()`
    const entitySchema = await prompter.chooseEntity();

    // Retourner le schéma de l'entité si l'utilisateur n'a pas choisi "Quit"
    return entitySchema !== "Quit" ? entitySchema : null;
}



/**
* Ouvre le fichier schema.prisma et renvoie le schéama de l'entité choisie
**/
export const modifyEntityDefinition = async () => {
    let isFormated = false;
    // tant que le fichier n'est pas formater on le formate
    while (!isFormated) {
        try {
            await formatter();
            isFormated = true;
        } catch (error) {
            console.error('Erreur lors du formatage du fichier schema.prisma :', error);
        }
    }
    const prompter = new Prompter();
    // Demander quelle entité modifier
    const entityName = await prompter.chooseEntity();
    if (!entityName || entityName === "Quit") return;

    // Lire le fichier de schéma Prisma pour obtenir le schéma complet
    const schema = await fsp.readFile('prisma/schema.prisma', 'utf8');

    // Trouver la section du modèle spécifié
    const modelStartIndex = schema.indexOf(`model ${entityName} {`);
    if (modelStartIndex === -1) {
        console.error('Le modèle spécifié est introuvable.');
        return;
    }
    const modelEndIndex = schema.indexOf('}', modelStartIndex);
    let modelSchema = schema.substring(modelStartIndex, modelEndIndex);

    // Ajouter un saut de ligne après '{'
    modelSchema = modelSchema.replace(`model ${entityName} {`, `model ${entityName} {\n`);

    // Demander à l'utilisateur quelle colonne il veut modifier
    const columnName = await prompter.chooseColumn(entityName);
    if (!columnName) return;

    // Poser des questions pour obtenir les nouveaux détails de la colonne
    const columnTypeInput = await prompter.ask(QuestionsKeysEnum.COLUMN_TYPE);
    let columnType;

    // Correction du switch statement
    switch (columnTypeInput) {
        case 'string':
            columnType = "String";
            break;
        case 'number':
            columnType = "Int";
            break;
        case 'boolean':
            columnType = "Boolean";
            break;
        case 'date':
            columnType = "DateTime";
            break;
        default:
            columnType = "String";
    }

    const isPrimary = await prompter.ask(QuestionsKeysEnum.IS_PRIMARY) === 'true';
    const isGenerated = await prompter.ask(QuestionsKeysEnum.IS_GENERATED) === 'true' && columnTypeInput === 'Int';
    const isUnique = await prompter.ask(QuestionsKeysEnum.IS_UNIQUE) === 'true' && !isPrimary;
    const isNullable = await prompter.ask(QuestionsKeysEnum.IS_NULABLE) === 'true';
    const defaultValue = await prompter.ask(QuestionsKeysEnum.DEFAULT_VALUE);

    // Construire la nouvelle définition de la colonne
    let newColumnDefinition = `\n${columnName} ${columnType}`;
    if (isPrimary) newColumnDefinition += ' @id';
    if (isGenerated) newColumnDefinition += ' @default(autoincrement())';
    if (isUnique) newColumnDefinition += ' @unique';
    if (isNullable) newColumnDefinition += ' @default(null)';
    if (defaultValue) newColumnDefinition += ` @default("${defaultValue}")`;
    newColumnDefinition += '\n'; // Ajout d'un saut de ligne à la fin

    // Utiliser une regex plus précise pour remplacer la définition de la colonne
    const columnRegex = new RegExp(`\\s+${columnName}[^\\n]*\\n`, 'g');
    modelSchema = modelSchema.replace(columnRegex, `  ${newColumnDefinition}`);

    // Reconstruire le schéma et l'écrire de nouveau
    const updatedSchema = schema.substring(0, modelStartIndex)
        + modelSchema + '\n}'
        + schema.substring(modelEndIndex + 1);
    await fsp.writeFile('prisma/schema.prisma', updatedSchema);

    console.log('La modification a été appliquée avec succès.');
    console.log('N\'oubliez pas de formater le fichier schema.prisma.');
    await formatter();
    console.log('Le fichier schema.prisma a été formaté avec succès.');

    // Ensemble de la colonne modifiée
    const column: ColumnDetails = {
        columnName: columnName as string,
        type: columnType as string,
        isPrimary: isPrimary as boolean,
        isGenerated: isGenerated,
        isUnique: isUnique,
        nullable: isNullable,
        default: ""
    };

};










/**
 * Génère un fichier de définition d'entité
 * @returns {Promise<void>}
 * @constructor
 * @async
 */
export async function generateEntityDefinition() {
    const prompter = new Prompter();
    // 1. Poser une série de questions pour configurer le fichier de définition d'entité
    const entityName = await prompter.ask(QuestionsKeysEnum.ENTITY_NAME);
    const generateTable = await prompter.ask(QuestionsKeysEnum.GENERATE_TABLE);
    const tableName = await prompter.ask(QuestionsKeysEnum.TABLE_NAME, { default: pluralize(entityName as string) });

    // 2. Initialiser les colonnes avec la colonne 'id' par défaut
    const columns: ColumnDetails[] = [{
        columnName: 'id',
        type: 'number',
        isPrimary: true,
        isGenerated: true,
        isUnique: false,
        nullable: false,
        default: ''
    }];

    let moreColumns = true;
    while (moreColumns) {
        const columnName = await prompter.ask(QuestionsKeysEnum.COLUMN_NAME);
        const columnType = await prompter.ask(QuestionsKeysEnum.COLUMN_TYPE);
        const isPrimary = await prompter.ask(QuestionsKeysEnum.IS_PRIMARY) === "true";
        const isGenerated = await prompter.ask(QuestionsKeysEnum.IS_GENERATED) === "true";
        const isUnique = await prompter.ask(QuestionsKeysEnum.IS_UNIQUE) === "true";
        const isNullable = await prompter.ask(QuestionsKeysEnum.IS_NULABLE) === "true";
        const defaultValue = await prompter.ask(QuestionsKeysEnum.DEFAULT_VALUE);
        const column: ColumnDetails = {
            columnName: columnName as string,
            type: columnType as string,
            isPrimary: isPrimary as boolean,
            isGenerated: isGenerated as boolean,
            isUnique: isUnique as boolean,
            nullable: isNullable as boolean,
            default: defaultValue as string,
        };
        // 3. Ajouter la colonne à la liste des colonnes
        columns.push(column);
        // 4. Demander à l'utilisateur s'il veut ajouter plus de colonnes
        moreColumns = await prompter.ask(QuestionsKeysEnum.MORE_COLUMNS) === "true";
    }

    // 5. Ajouter les colonnes dans le fichier de définition d'entité prisma
    let prismaFile = 'prisma/schema.prisma';
    let prismaModel = `model ${entityName} {\n`;
    for (const column of columns) {
        switch (column.type) {
            case 'string':
                column.type = "String";
                break;
            case 'number':
                column.type = "Int";
                break;
            case 'boolean':
                column.type = "Boolean";
                break;
            case 'date':
                column.type = "DateTime";
                break;
            default:
                column.type = "String";
        }

        prismaModel += `  ${column.columnName} ${column.type}`;
        if (column.isPrimary) {
            prismaModel += ' @id';
        }
        if (column.isGenerated) {
            prismaModel += ' @default(autoincrement())';
        }
        if (column.isUnique) {
            prismaModel += ' @unique';
        }
        if (column.nullable) {
            prismaModel += ' @default(null)';
        }
        const defaultValue = await prompter.ask(QuestionsKeysEnum.DEFAULT_VALUE);
        if (defaultValue) {
            // Vérifier si le type de la colonne nécessite des guillemets autour de la valeur par défaut
            if (['String', 'DateTime'].includes(column.type)) {
                prismaModel += ` @default("${defaultValue}")`;
            } else {
                prismaModel += ` @default("${defaultValue}")`;
            }
        }


        prismaModel += '\n';
    }
    prismaModel += '}\n';
    appendFileSync(prismaFile, prismaModel);
}

export async function applyModificationToColumn(entityName: string, selectedColumn: string, selectedProperty: string, newValue: any) {
    try {
        // Lire le fichier de schéma Prisma
        const schema = await fsp.readFile('prisma/schema.prisma', 'utf8');

        // Trouver la section du modèle spécifié
        const modelStartIndex = schema.indexOf(`model ${entityName} {`);
        const modelEndIndex = schema.indexOf('}', modelStartIndex);
        let modelSchema = schema.substring(modelStartIndex, modelEndIndex);

        // Modifier la colonne spécifiée
        const lines = modelSchema.split('\n');
        const updatedLines = lines.map(line => {
            if (line.includes(selectedColumn)) {
                // Modifier la ligne en fonction de la propriété sélectionnée et de la nouvelle valeur
                switch (selectedProperty) {
                    case 'Nom de la colonne':
                        return line.replace(selectedColumn, newValue);
                    case 'Type de la colonne':
                        return line.replace(/(\w+\s+)\w+/, `$1${newValue}`);
                    // Ajouter des cas pour d'autres propriétés comme isPrimary, isGenerated, etc.
                }
            }
            return line;
        });

        // Reconstruire le schéma et l'écrire de nouveau
        const updatedModelSchema = updatedLines.join('\n');
        const updatedSchema = schema.substring(0, modelStartIndex)
            + updatedModelSchema
            + schema.substring(modelEndIndex);

        await fsp.writeFile('prisma/schema.prisma', updatedSchema);

        console.log('La modification a été appliquée avec succès.');
    } catch (error) {
        console.error('Erreur lors de la modification de la colonne :', error);
    }
}