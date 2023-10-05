import * as fs from "fs";
import * as path from "path";
import { Prompter } from '../utils/Prompter.js';
import { ColumnDetails } from "../utils/Column.details.interface.js";

const WIZGEN_FOLDER = "dist/.wizgen";
const WIZGEN_ENTITY_DEFINITION_FILE = 'entity.definition.json';

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

    if (command.append && fs.existsSync(entityDefinitionPath)) {
        // Lisez et parsez le fichier existant
        const content = fs.readFileSync(entityDefinitionPath, 'utf-8');
        data = JSON.parse(content);
        data.version += 1; // Mettez à jour la version
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
            field: columnName,
            type: columnType,
            isPrimary,
            isGenerated,
            isUnique,
            nullable: isNullable,
            default: ""
        });

        addMoreColumns = await prompter.ask("MORE_COLUMNS") === 'yes';
    }

    // Demandez à l'utilisateur le format dans lequel il souhaite sauvegarder le schéma
    const schemaFormat = await prompter.ask("SCHEMA_FORMAT");

    if (schemaFormat === "JSON") {
        const entity = {
            entityName: entityName,
            columns: columns
        };
        data.entities.push(entity);
        fs.writeFileSync(entityDefinitionPath, JSON.stringify(data, null, 4));
        console.log("Entity generated:", `${WIZGEN_FOLDER}/${WIZGEN_ENTITY_DEFINITION_FILE}`);
    } else if (schemaFormat === "Zod") {
        let zodSchema = 'import { z } from "zod";\n\n';
        zodSchema += `const ${entityName}Schema = z.object({\n`;
        for (const column of columns) {
            zodSchema += `    ${column.field}: ${mapTypeToZod(column.type)},\n`;
        }
        zodSchema += '});\n\nexport default ' + `${entityName}Schema;`;
        const zodFilePath = path.join(WIZGEN_FOLDER, `${entityName}.schema.ts`);
        fs.writeFileSync(zodFilePath, zodSchema);
        console.log(`Schema Zod généré : ${zodFilePath}`);
    }
}

function mapTypeToZod(type: string): string {
    switch (type) {
        case "string":
            return "z.string()";
        case "number":
            return "z.number()";
        case "boolean":
            return "z.boolean()";
        case "date":
            return "z.date()";
        default:
            return "z.unknown()"; // Type par défaut si aucun match n'est trouvé
    }
}
