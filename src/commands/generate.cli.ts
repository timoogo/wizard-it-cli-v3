import * as fs from "fs";
import * as path from "path";
import { Prompter } from "../utils/prompter.utils.js";
import {QUESTIONS}  from '../resources/en/en.resource.js';
import { ColumnDetails } from "../utils/Column.details.interface.js";
import { loadSchemaFromEntityName } from "../utils/entity.utils.js";

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

    // If append flag is not provided, reset the data
    if (!command.append) {
        data = {
            entities: [],
            version: 1
        };
    } else if (fs.existsSync(entityDefinitionPath)) {
        // Lisez et parsez le fichier
        const content = fs.readFileSync(entityDefinitionPath, 'utf-8');
        data = JSON.parse(content);
        // Mettez à jour la version
        data.version += 1;
    }

    // Demandez le nom de l'entité
    const entityName = await prompter.ask("ENTITY_NAME");
    
    // Bouclez pour demander des colonnes
    let columns: ColumnDetails[] = [];
    let addMoreColumns = true;

    while (addMoreColumns) {
        const columnName = await prompter.ask("COLUMN_NAME");
        const columnType = await prompter.ask("COLUMN_TYPE");
        const isPrimary = await prompter.ask("IS_PRIMARY") === 'yes';
        const isGenerated = await prompter.ask("IS_GENERATED") === 'yes';
        const isUnique = await prompter.ask("IS_UNIQUE") === 'yes';
        const isNullable = await prompter.ask("IS_NULABLE") === 'yes';

        columns.push({
            entityName: columnName,
            type: columnType,
            isPrimary,
            isGenerated,
            isUnique,
            nullable: isNullable,
            default: ""
        });

        addMoreColumns = await prompter.ask("MORE_COLUMNS") === 'yes';
    }

    // Enregistrez dans un fichier JSON (si l'utilisateur le souhaite)
    const saveToJson = await prompter.ask("SAVE_TO_JSON") === 'yes';
    if (saveToJson) {
        const entity = {
            entityName: entityName,
            columns: columns
        };
        data.entities.push(entity);

        // Écrivez l'objet mis à jour dans le fichier
        fs.writeFileSync(entityDefinitionPath, JSON.stringify(data, null, 4));

        console.log("Entity generated:", `${WIZGEN_FOLDER}/${WIZGEN_ENTITY_DEFINITION_FILE}`);
    }
}

export async function generatePanel() {
    const prompter = new Prompter();
    console.log('Génération d\'un panneau pour une entité spécifique dans une application Next.js');
    // 1. Interroger l'utilisateur sur l'entité pour laquelle générer un panel
    const selectedEntity = await prompter.ask('SELECT_ENTITY');

    // 2. Vérifier si le schéma de l'entité existe
    const schema = loadSchemaFromEntityName(selectedEntity) // Chargez le schéma depuis le fichier JSON

    if (!schema) {
        console.error(`No schema found for entity: ${selectedEntity}`);
        return;
    }

    // 3. Poser une série de questions pour configurer le panel
    const panelName = await prompter.ask('PANEL_NAME', selectedEntity as string);
    const entryPoint = await prompter.ask('ENTRY_POINT', `/${selectedEntity}`);
    const pagesToGenerate = await prompter.ask('PAGES_TO_GENERATE');

    // 4. Créer les fichiers et dossiers nécessaires
    generateFiles(selectedEntity, panelName, entryPoint, pagesToGenerate);
}



function generateFiles(entity: string, panelName: string, entryPoint: string, pages: string[]) {
    const prompter = new Prompter();
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


function appendToFile(filePath: string, content: string) {
    // Si le fichier n'existe pas, il sera créé avec le contenu fourni
    fs.appendFileSync(filePath, content);
}