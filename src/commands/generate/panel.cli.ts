import {Prompter} from "../../utils/prompter.utils.js";
import {loadSchemaFromEntityName} from "../../utils/entity.utils.js";
import {ALL} from "../../resources/constants/crud.constant.js";
import {directoryName} from "../../resources/constants/utils.constant.js";
import fs from "fs";
import { QuestionsKeysEnum } from "../../resources/global/translations.js";
/**
 * Génère un panneau pour une entité spécifique dans une application Next.js
 * @returns {Promise<void>}
 * @constructor
 * @async
 */

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
    const panelDirectory = `${directoryName}/src/panels/${panelName}`;
    const templateDirectory = `${directoryName}/src/template`;
    const distDirectory = `${directoryName}/dist`;




    // il rentre dans /template
    // 5. Copiez les fichiers/ dossiers de modèle dans le dossier de destination (dist/.wizgen/templates/{panelName})
    // 6. Remplacez les variables dans les fichiers de modèle par les valeurs fournies par l'utilisateur

    //
}