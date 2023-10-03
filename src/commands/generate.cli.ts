import * as fs from "fs";
import * as path from "path";
import { Prompter } from '../utils/Prompter.js';
import {QUESTIONS}  from '../resources/en/en.resource.js';
import { ColumnDetails } from "../utils/Column.details.interface.js";

const WIZGEN_FOLDER =  "dist/.wizgen";
const WIZGEN_ENTITY_DEFINITION_FILE =  'entity.definition.json';

interface CommandOptions {
    append?: boolean;
}
interface EntityDefinition {
    entities: { entityName: string, columns: ColumnDetails[] }[];
    version: number;
}
export const generate = async (command: CommandOptions) => {
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
