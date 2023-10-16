import * as fs from "fs";
import * as path from "path";
import { Prompter } from "../utils/prompter.utils.js";
import { QuestionsKeysEnum} from '../resources/en/en.resource.js';
import { ColumnDetails } from "../utils/Column.details.interface.js";
import { loadSchemaFromEntityName } from "../utils/entity.utils.js";
import { DEFAULT_PROPERTIES } from "../utils/default.properties.js"
import { ALL } from "../resources/constants/crud.constant.js";
import { ENTITIES_NAME_SAMPLES } from "../resources/constants/samples.constant.js";
import {Driver} from "../resources/constants/drivers.constant.js";
import { execSync } from 'child_process';
// import pg
import pkg from 'pg';
const { Client } = pkg;


const WIZGEN_FOLDER =  "dist/.wizgen";
const WIZGEN_ENTITY_DEFINITION_FILE =  'entity.definition.json';

interface CommandOptions {
    append?: boolean;
}
interface EntityDefinition {
    entities:
     { entityName: string, columns: ColumnDetails[] }[];
    version: number;
}


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

export const generateEntity = async (command: CommandOptions) => {
    const prompter = new Prompter();

    // Step 1: Check if the file entity.definition.json exists
    const entityDefinitionPath = path.join(WIZGEN_FOLDER, WIZGEN_ENTITY_DEFINITION_FILE);
    let data: EntityDefinition = {
        entities: [],
        version: 1
    };

    if (fs.existsSync(entityDefinitionPath)) {
        const content = fs.readFileSync(entityDefinitionPath, 'utf-8');
        data = JSON.parse(content);
    }

    if (command.append && data.entities.length) {
        await appendEntity(data, prompter, entityDefinitionPath);
    } else {
        const entityName = await createNewEntity(prompter);
        if (!entityName) {
            console.error("Le nom de l'entité n'est pas défini.");
            return;
        }

        let columns: ColumnDetails[] = await gatherColumnsDetails(prompter);

        // Save to a JSON file (if the user wants to)
        const saveToJson = await prompter.ask(QuestionsKeysEnum.SAVE_TO_JSON) === 'yes';
        if (saveToJson) {
            const entity: { entityName: string, columns: ColumnDetails[] } = {
                entityName: entityName,
                columns: columns
            };
            data.entities.push(entity);

            fs.writeFileSync(entityDefinitionPath, JSON.stringify(data, null, 4));
            console.log("Entity generated:", `${WIZGEN_FOLDER}/${WIZGEN_ENTITY_DEFINITION_FILE}`);
        }
    }
}

const appendEntity = async (data: EntityDefinition, prompter: Prompter, entityDefinitionPath: string) => {
    const entityNames = data.entities.map((entity: { entityName: string }) => entity.entityName);
    const selectedEntityName = await prompter.ask("SELECT_ENTITY", {
        message: "Pour quelle entité souhaitez-vous ajouter des colonnes ?",
        choices: entityNames
    });

    // Use `selectedEntityName` to identify which entity should be modified.
    // Add more columns to the selected entity
    const additionalColumns: ColumnDetails[] = await gatherColumnsDetails(prompter);
    const entity = data.entities.find(e => e.entityName === selectedEntityName);
    if (entity) {
        entity.columns.push(...additionalColumns);
    }

    // Save the modifications
    fs.writeFileSync(entityDefinitionPath, JSON.stringify(data, null, 4));
    console.log("Entity updated:", `${WIZGEN_FOLDER}/${WIZGEN_ENTITY_DEFINITION_FILE}`);
}

const createNewEntity = async (prompter: Prompter): Promise<string | null> => {
    const randomIndex = Math.floor(Math.random() * ENTITIES_NAME_SAMPLES.length);
    const entityName = await prompter.ask("ENTITY_NAME", ENTITIES_NAME_SAMPLES[randomIndex]);
    if (!entityName) {
        return null;
    }
    return entityName;
}

const gatherColumnsDetails = async (prompter: Prompter): Promise<ColumnDetails[]> => {
    let columns: ColumnDetails[] = [];
    let addMoreColumns = true;

    while (addMoreColumns) {
        const columnName = await prompter.ask(QuestionsKeysEnum.COLUMN_NAME);
        if (!columnName) {
            console.error("Le nom de la colonne n'est pas défini.");
            break;
        }

        if (DEFAULT_PROPERTIES.hasOwnProperty(columnName)) {
            const columnProperties = DEFAULT_PROPERTIES[columnName];
            const confirm = await prompter.ask(QuestionsKeysEnum.CONFIRM_DEFAULT_PROPERTIES, columnName);
            if (confirm === 'yes') {
                columns.push(columnProperties as Required<ColumnDetails>);
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
}

export async function generatePanel() {
    const prompter = new Prompter();
    console.log('Génération d\'un panneau pour une entité spécifique dans une application Next.js');
    // 1. Interroger l'utilisateur sur l'entité pour laquelle générer un panel
    const selectedEntity = await prompter.ask(QuestionsKeysEnum.SELECT_ENTITY);

    // 2. Vérifier si le schéma de l'entité existe
    const schema = loadSchemaFromEntityName(selectedEntity) // Chargez le schéma depuis le fichier JSON

    if (!schema) {
        console.error(`No schema found for entity: ${selectedEntity}`);
        return;
    }

    // 3. Poser une série de questions pour configurer le panel
    const panelName = await prompter.ask(QuestionsKeysEnum.PANEL_NAME, selectedEntity as string);
    const entryPoint = await prompter.ask(QuestionsKeysEnum.ENTRY_POINT, `/${selectedEntity}`);
    const pagesToGenerate = await prompter.ask(QuestionsKeysEnum.PAGES_TO_GENERATE, ALL);

    // 4. Créer les fichiers et dossiers nécessaires
    generateFiles(selectedEntity, panelName, entryPoint, pagesToGenerate);

    // il rentre dans /template
    // 5. Copiez les fichiers/ dossiers de modèle dans le dossier de destination (dist/.wizgen/templates/{panelName})
    // 6. Remplacez les variables dans les fichiers de modèle par les valeurs fournies par l'utilisateur

    //
}



function generateFiles(entity: string | undefined | null, panelName: string | undefined | null, entryPoint: string | undefined | null, pages: string | undefined | null) {
    const prompter = new Prompter();
    if (!pages) {
        console.warn('No pages to generate');
        throw new Error('No pages to generate')
    }
    if (!entity) {
        console.warn('No entity selected');
        throw new Error('No entity selected')
    }
    const PORT = prompter.ask('PORT');
    // Créer les dossiers et fichiers pour les pages
    if (pages.includes('list')) {
        createFile(`src/pages/${panelName}/index.tsx`, '');
    }
    if (pages.includes('create')) {
        createFile(`src/pages/${panelName}/create.tsx`, '');
    }
    // ... Répétez pour les autres types de pages ...

    // Créer les dossiers et fichiers pour l'API
    createFile(`src/api/${panelName}/route.ts`, '');

    // Mettre à jour les constants
    appendToFile(`src/constants/api.routes.constants.ts`, `export const ${entity.toUpperCase()}_API_ROUTE = 'http://localhost:${PORT}/api/${entity}';`);
}
function createFile(filePath: string, content: string) {
    // Assurez-vous que le dossier parent existe
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    // Créez ou écrasez le fichier avec le contenu fourni
    fs.writeFileSync(filePath, content);
}

function copyFile(source: string, destination: string) {
    fs.copyFileSync(source, destination);
}

function logFilesInDirectory(key: string, directory: string) {
    console.log(fs.readdirSync(directory));
}
function appendToFile(filePath: string, content: string) {

// log le contenu du fichier avant l'ajout
    console.log("avant",fs.readFileSync(filePath, 'utf-8'));
    fs.appendFileSync(filePath, content);
// log le contenu du fichier après l'ajout
    console.log("après",fs.readFileSync(filePath, 'utf-8'));
}


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
            password = await prompter.ask(QuestionsKeysEnum.PASSWORD);
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

export const generateDb = () => {
    try {
        console.log('Génération du fichier de migration...');
        execSync('prisma migrate dev --name init', { stdio: 'inherit' });

        console.log('La base de données a été générée avec succès.');
    } catch (error) {
        console.error('Erreur lors de la génération de la base de données:', error);
    }
};