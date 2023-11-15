import * as fs from "fs";
import * as path from "path";
import { Prompter } from "../utils/prompter.utils.js";
import { ENTITIES_NAME_SAMPLES } from "../resources/constants/samples.constant.js";
import {Driver} from "../resources/constants/drivers.constant.js";
// import pg
import pkg from 'pg';
import {directoryName, WIZGEN_FOLDER, WIZGEN_ENTITY_DEFINITION_FILE} from "../resources/constants/utils.constant.js";
import {
    Entity,
    EntityDefinition, getColumnDetails, saveEntityDefinition,
    useDefaultProperties,
} from "../commands/generate/utils.cli.js";
import { init } from "./init.cli.js";
import { DEFAULT_PROPERTIES } from "../utils/default.properties.js";
import { ColumnDetails } from "../utils/Column.details.interface.js";
import { log } from "console";
import { ErrorMessagesEnum, QuestionsKeysEnum } from "../resources/global/translations.js";
const { Client } = pkg;

export const createEntityDefinition = async (): Promise<void> => {
    // Initialization
    const prompter = new Prompter();

    // Define the path for entity definition file
    const entityDefinitionPath = path.join(WIZGEN_FOLDER, WIZGEN_ENTITY_DEFINITION_FILE);
    let data: EntityDefinition = {
        entities: []
    };

    const isAppendMode = process.argv.includes("--append");

    if (isAppendMode && fs.existsSync(entityDefinitionPath)) {
        try {
            const content = fs.readFileSync(entityDefinitionPath, 'utf-8');
            data = JSON.parse(content);
            if (!data.entities) {
                data.entities = [];
            }
            data.version = (data.version || 0) + 1;
        } catch (error) {
            console.error("Erreur lors de la lecture du fichier entity.definition.json:", error);
        }
    } else {
        await init();
        data.version = 1;
    }

    // Ask for the entity name
    const randomIndex = Math.floor(Math.random() * ENTITIES_NAME_SAMPLES.length);
    const entityName = await prompter.ask(QuestionsKeysEnum.ENTITY_NAME, ENTITIES_NAME_SAMPLES[randomIndex]);
    if (!entityName) {
        console.error("Le nom de l'entité n'est pas défini.");
        return;
    }

    const columns: ColumnDetails[] = [];
    let addAnotherColumn = true;

    while (addAnotherColumn) {
        // Ask for the column name
        const columnName = await prompter.ask(QuestionsKeysEnum.COLUMN_NAME);
        if (columnName && DEFAULT_PROPERTIES.hasOwnProperty(columnName)) {
            const columnProperty = DEFAULT_PROPERTIES[columnName];
            const useDefault = await prompter.ask(QuestionsKeysEnum.CONFIRM_DEFAULT_PROPERTIES) === 'show';
            if (useDefault && columnProperty) {
                console.table(columnProperty);
                const useDefault = await prompter.ask(QuestionsKeysEnum.CONFIRM_DEFAULT_PROPERTIES) === 'yes';
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

        // Ask if the user wants to add another column
        addAnotherColumn = await prompter.ask(QuestionsKeysEnum.MORE_COLUMNS) === 'yes';
    }

    const saveToFile = await prompter.ask(QuestionsKeysEnum.SAVE_TO_JSON) === 'yes';
    if (saveToFile) {
        const entity: Entity = {
            entityName: entityName,
            columns: columns
        };
        data.entities.push(entity);
        await saveEntityDefinition(data, entityDefinitionPath);
    } else {
        console.log(JSON.stringify(columns, null, 2));
    }
};


function isCompleteColumnDetails(column: Partial<ColumnDetails>): column is ColumnDetails {
    return column.columnName !== undefined && column.type !== undefined;
    // Ajoutez d'autres vérifications si nécessaire
}

const appendEntityDefinition = async (): Promise<void> => {
    const prompter = new Prompter();

    const entityDefinitionPath = path.join(WIZGEN_FOLDER, WIZGEN_ENTITY_DEFINITION_FILE);
    let data: EntityDefinition;
    if (fs.existsSync(entityDefinitionPath)) {
        const content = fs.readFileSync(entityDefinitionPath, 'utf-8');
        data = JSON.parse(content);
    } else {
        console.error(ErrorMessagesEnum.ENTITY_DEFINITION_NOT_FOUND);
        return;
    }

    const entityNames = data.entities.map(entity => entity.entityName);
    const selectedEntityName = await prompter.ask(QuestionsKeysEnum.SELECT_ENTITY, {
        choices: entityNames
    });

    const selectedEntity = data.entities.find(entity => entity.entityName === selectedEntityName);

    if (!selectedEntity) {
        console.error("Selected entity not found.");
        return;
    }

    const columns = [...await useDefaultProperties(prompter), ...await getColumnDetails(prompter)];

    selectedEntity.columns.push(...columns);

    await saveEntityDefinition(data, entityDefinitionPath);
};

export const testPostgresConnection = async (connectionString: string): Promise<boolean> => {
    const client = new Client({
        connectionString: connectionString
    });

    try {
        await client.connect();
        console.log('Connexion à PostgreSQL réussie !');
        await client.end();
        return true;
    } catch (error) {
        console.error('Erreur lors de la connexion à PostgreSQL :', error);
        return false;
    }
};
export const generateEnv = async () => {
    const prompter = new Prompter();
    let isConnected = false;
    let databaseName, driver, hostName, userName, password, port;

    while (!isConnected) {
        databaseName = await prompter.ask(QuestionsKeysEnum.DATABASE_NAME);
        driver = await prompter.ask(QuestionsKeysEnum.SELECT_DRIVER);

        if (driver === Driver.POSTGRES) {
            hostName = await prompter.ask(QuestionsKeysEnum.HOST_NAME, 'localhost');
            userName = await prompter.ask(QuestionsKeysEnum.USER_NAME, 'postgres');
            password = await prompter.ask(QuestionsKeysEnum.PASSWORD, 'root');
            port = await prompter.ask(QuestionsKeysEnum.PORT, '5432');
        }

        if (driver === Driver.POSTGRES) {
            const testConnectionString = `postgresql://${userName}:${password}@${hostName}:${port}/postgres`;
            const client = new Client({ connectionString: testConnectionString });
            try {
                await client.connect();
                isConnected = true;
                await client.end();
                console.log("Connexion réussie à PostgreSQL !");
            } catch (e) {
                console.error("Erreur lors de la connexion à PostgreSQL :", e);
                console.log("Veuillez entrer à nouveau les informations de connexion.");
            }
        }
    }

    const createDbClient = new Client({
        connectionString: `postgresql://${userName}:${password}@${hostName}:${port}/postgres`
    });
    await createDbClient.connect();

    // Vérifier si la base de données existe
    const dbExists = await createDbClient.query(`SELECT datname FROM pg_database WHERE datname = '${databaseName}';`);
    if (dbExists.rows.length > 0) {
        const replaceConfirm = await prompter.ask(QuestionsKeysEnum.CONFIRM_DELETE_DATABASE);
        if (!replaceConfirm) {
            console.log("Base de données existante non remplacée. Opération terminée.");
            await createDbClient.end();
            return;
        }
        await createDbClient.query(`DROP DATABASE ${databaseName};`);
    }

    await createDbClient.query(`CREATE DATABASE ${databaseName};`);
    console.log(`Base de données '${databaseName}' créée avec succès !`);
    await createDbClient.end();

    const envPath = path.join(process.cwd(), '.env');

    let connectionString = '';
    switch (driver) {
        case Driver.MYSQL:
            connectionString = `DATABASE_URL="mysql://${userName}:${password}@${hostName}:${port}/${databaseName}"\n`;
            break;
        case Driver.POSTGRES:
            connectionString = `DATABASE_URL="postgresql://${userName}:${password}@${hostName}:${port}/${databaseName}?schema=public"\n`;
            break;
        case Driver.MARIADB:
            connectionString = `DATABASE_URL="mariadb://${userName}:${password}@${hostName}:${port}/${databaseName}"\n`;
            break;
        default:
            console.log('Driver non reconnu.');
            return;
    }

    // Lisez le contenu existant du fichier .env
    let existingContent = fs.readFileSync(envPath, 'utf-8');

    // Supprimez l'ancienne chaîne de connexion DATABASE_URL si elle existe
    const databaseUrlRegex = /^DATABASE_URL=.*$/m;
    if (databaseUrlRegex.test(existingContent)) {
        existingContent = existingContent.replace(databaseUrlRegex, connectionString);
    } else {
        // Si DATABASE_URL n'existe pas, ajoutez simplement la nouvelle chaîne de connexion à la fin
        existingContent += `\n${connectionString}\n`;
    }

    // Écrivez le contenu mis à jour dans le fichier .env
    fs.writeFileSync(envPath, existingContent);
    console.log(`Chaîne de connexion pour ${driver} ajoutée ou mise à jour dans le fichier .env.`);

    console.log(existingContent);
};



