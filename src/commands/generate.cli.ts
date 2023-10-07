import * as fs from "fs";
import * as path from "path";
import { Prompter } from "../utils/prompter.utils.js";
import { QuestionsKeysEnum} from '../resources/en/en.resource.js';
import { ColumnDetails } from "../utils/Column.details.interface.js";
import { loadSchemaFromEntityName } from "../utils/entity.utils.js";
import { DEFAULT_PROPERTIES } from "../utils/default.properties.js"
import { ALL } from "../resources/constants/crud.constant.js";
import {ENTITIES_NAME_SAMPLES} from "../resources/constants/samples.constant.js";


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


export const generateEntity = async (command: CommandOptions) => {
    const prompter = new Prompter();

    // Étape 1 : Vérifiez si le fichier entity.definition.json existe
    const entityDefinitionPath = path.join(WIZGEN_FOLDER, WIZGEN_ENTITY_DEFINITION_FILE);
    let data: EntityDefinition = {
        entities: [],
        version: 1
    };

    if (command.append && fs.existsSync(entityDefinitionPath)) {
        const content = fs.readFileSync(entityDefinitionPath, 'utf-8');
        data = JSON.parse(content);
        data.version += 1;
    }

    // Demandez le nom de l'entité
    const randomIndex = Math.floor(Math.random() * ENTITIES_NAME_SAMPLES.length);
    const entityName = await prompter.ask("ENTITY_NAME", ENTITIES_NAME_SAMPLES[randomIndex]);
    if (!entityName) {
        console.error("Le nom de l'entité n'est pas défini."); //Remplacer par un Raise error
        return;
    }

    let columns: ColumnDetails[] = [];
    let addMoreColumns = true;

    while (addMoreColumns) {
        const columnName = await prompter.ask(QuestionsKeysEnum.COLUMN_NAME);
        // si columnName fait partie des propriétés par défaut, on utilise les valeurs par défaut
        if (!columnName) return;
        if(columnName in DEFAULT_PROPERTIES) {
            const columnProperties = DEFAULT_PROPERTIES[columnName]
            if (!columnProperties) return;
            console.log(columnProperties)
            const confirm = await prompter.ask(QuestionsKeysEnum.CONFIRM_DEFAULT_PROPERTIES, columnName);
            if (confirm === 'no') {
                continue;
            } else if (confirm === 'yes') {
                columns.push(columnProperties as Required<ColumnDetails>);
            }
        }
        else {
            const columnType = await prompter.ask(QuestionsKeysEnum.COLUMN_TYPE);
            const isPrimary = await prompter.ask(QuestionsKeysEnum.IS_PRIMARY) === 'yes';
            const isGenerated = await prompter.ask(QuestionsKeysEnum.IS_GENERATED) === 'yes';
            const isUnique = await prompter.ask(QuestionsKeysEnum.IS_UNIQUE) === 'yes';
            const isNullable = await prompter.ask(QuestionsKeysEnum.IS_NULABLE) === 'yes';

            columns.push(<ColumnDetails>{
                entityName: columnName,
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

    // Enregistrez dans un fichier JSON (si l'utilisateur le souhaite)
    const saveToJson = await prompter.ask(QuestionsKeysEnum.SAVE_TO_JSON) === 'yes';
    if (saveToJson) {
        const entity: {entityName: string, columns: ColumnDetails[]} = {
            entityName: entityName,
            columns: columns
        };
        data.entities.push(entity);

        fs.writeFileSync(entityDefinitionPath, JSON.stringify(data, null, 4));

        console.log("Entity generated:", `${WIZGEN_FOLDER}/${WIZGEN_ENTITY_DEFINITION_FILE}`);
    }
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

function appendToFile(filePath: string, content: string) {
    // Si le fichier n'existe pas, il sera créé avec le contenu fourni
    fs.appendFileSync(filePath, content);
}
