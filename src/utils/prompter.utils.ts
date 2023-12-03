import inquirer, {InputQuestion, Question, Answers, PasswordQuestion} from 'inquirer';
import {ListOrCheckboxQuestion, QuestionType} from './Questions.type.js';
import * as fs from "fs";
import * as fsp from "fs/promises";
import { LanguageCode } from './language.utils.js';
// import questions from global translations
 import { getQuestions, questionKeys } from '../resources/global/global.js';
import {QuestionsKeysEnum} from "../resources/global/translations.js";

interface CustomOptions {
    message?: string;
    default?: any;
    choices?: string[];

    // ... any other parameters you might want to customize
}

export class Prompter {
    private language: LanguageCode;

    constructor(language: LanguageCode = LanguageCode.EN) {
        this.language = language;
        // Directly use QUESTIONS from the imported resource
    }
public async    chooseProperty(selectedColumn1: string) {
        try {
            const answer = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'chosenProperty',
                    message: `Choisissez une propriété du modèle ${selectedColumn1} :`,
                    choices: ['type', 'isPrimary', 'isGenerated', 'isUnique', 'isNullable', 'default'],
                },
            ]);

            return answer.chosenProperty === "Quit" ? null : answer.chosenProperty;
        } catch (error) {
            console.error('Une erreur est survenue lors de la sélection de la propriété:', error);
            return null;
        }
}
    public async chooseColumn(modelName: string): Promise<string | null> {
        try {
            const schema = await fsp.readFile('prisma/schema.prisma', 'utf8');
            const modelStartIndex = schema.indexOf(`model ${modelName} {`);
            const modelEndIndex = schema.indexOf('}', modelStartIndex);
            const modelSchema = schema.substring(modelStartIndex, modelEndIndex);

            const columns = modelSchema.split('\n')
                .filter(line => {
                    // S'assurer que la ligne représente une déclaration de colonne
                    return line.trim() && !line.trim().startsWith('//') && !line.trim().startsWith('model') && line.includes('@');
                })
                .map(line => {
                    // Supposer que le premier mot est le nom de la colonne
                    const parts = line.trim().split(' ');
                    return parts[0];
                });

            if (columns.length === 0) {
                console.log(`Aucune colonne trouvée pour le modèle ${modelName}.`);
                return null;
            }

            const answer = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'chosenColumn',
                    message: `Choisissez une colonne du modèle ${modelName} :`,
                    choices: columns
                },
            ]);

            return answer.chosenColumn === "Quit" ? null : answer.chosenColumn;
        } catch (error) {
            console.error('Une erreur est survenue lors de la sélection de la colonne:', error);
            return null;
        }
    }
    public async chooseColumnProperty(): Promise<string | null> {
        // Définir les clés de questions pour les propriétés de colonne
        const propertyKeys = [
            QuestionsKeysEnum.COLUMN_NAME,
            QuestionsKeysEnum.COLUMN_TYPE,
            QuestionsKeysEnum.IS_PRIMARY,
            QuestionsKeysEnum.IS_GENERATED,
            QuestionsKeysEnum.IS_UNIQUE,
            QuestionsKeysEnum.IS_NULABLE,
            QuestionsKeysEnum.DEFAULT_VALUE
            // Ajoutez d'autres propriétés si nécessaire
        ];

        try {
            // Récupérer les libellés des questions traduits en fonction des clés
            const translatedQuestions = propertyKeys.map(key => {
                const questions = getQuestions();
                return questions[key] || `Translation missing for ${key}`; // Gestion de l'absence de traduction
            });

            const answer = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'chosenProperty',
                    message: 'Choisissez une propriété à modifier :',
                    choices: translatedQuestions
                },
            ]);

            return answer.chosenProperty === "Quit" ? null : answer.chosenProperty;
        } catch (error) {
            console.error('Une erreur est survenue lors de la sélection de la propriété de la colonne:', error);
            return null;
        }
    }
    public async chooseEntity(): Promise<string | null> {
        try {
            const schema = await fsp.readFile('prisma/schema.prisma', 'utf8');
            const entities = schema.split('\n')
                .filter(line => line.startsWith('model '))
                .map(line => {
                    const parts = line.split(' ');
                    return parts.length > 1 ? parts[1] : undefined;
                })
                .filter((name): name is string => !!name);

            const answer = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'chosenEntity',
                    message: 'Choisissez une entité :',
                    choices: [...entities, "Quit"],
                },
            ]);

            return answer.chosenEntity;
        } catch (error) {
            console.error('Une erreur est survenue lors de la sélection de l\'entité:', error);
            return null;
        }
    }

    public async ask(
        questionKey: typeof questionKeys[keyof typeof questionKeys],
        options?: CustomOptions | string
    ): Promise<string | undefined | null> {
        try {
            const questionData = getQuestions()[questionKey];

            if (!questionData) {
                console.warn(`Unknown question key: ${questionKey}`);
                return null;
            }

            // Determine if options is CustomOptions
            const isCustomOptions = typeof options === 'object';

            // Merge the original question data with the custom options if it's an object
            const finalQuestionData = isCustomOptions
                ? { ...questionData, ...options as CustomOptions }
                : questionData;

            let finalInquirerQuestion: Question;

            switch (finalQuestionData.type) {
                case 'list':
                case 'checkbox':
                    if ('choices' in finalQuestionData) {
                        finalInquirerQuestion = {
                            type: finalQuestionData.type,
                            name: 'response',
                            message: finalQuestionData.message,
                            choices: finalQuestionData.choices,
                            default: isCustomOptions ? (options as CustomOptions).default : finalQuestionData.default,
                        } as ListOrCheckboxQuestion;
                    } else {
                        finalInquirerQuestion = {
                            type: 'input',
                            name: 'response',
                            message: finalQuestionData.message,
                            default: isCustomOptions ? (options as CustomOptions).default : finalQuestionData.default,
                        } as InputQuestion;
                    }
                    break;
                case 'password':
                    finalInquirerQuestion = {
                        type: 'password',
                        name: 'response',
                        message: finalQuestionData.message,
                        mask: '*',
                    } as PasswordQuestion;
                    break;
                default:
                    finalInquirerQuestion = {
                        type: 'input',
                        name: 'response',
                        message: finalQuestionData.message,
                        default: isCustomOptions ? (options as CustomOptions).default : finalQuestionData.default,
                    } as InputQuestion;
                    break;
            }

            const answer: Answers = await inquirer.prompt([finalInquirerQuestion]);
            if (answer.response === "yes" || answer.response === "oui") {
                return "true";
            } else if (answer.response === "no" || answer.response === "non") {
                return "false";
            } else {
                return answer.response;
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de la pose de la question :", { error });
        }
    }


    /**
     * Get all created entities from the .wizgen/entity.definition.json file
     * @returns a list of entity names
     **/
    public get entities() {
        const content = fs.readFileSync('dist/.wizgen/entity.definition.json', 'utf-8');
        const entityDefinitionPath = 'dist/.wizgen/entity.definition.json';
        if (!fs.existsSync(entityDefinitionPath)) {
            return [];
        }
        else {
            // read the file
            fs.readFileSync(entityDefinitionPath, 'utf-8');
            // parse the file
            const data = JSON.parse(content);

        }
        return ''
    }

    /**
     * 
     * @param questionKeys 
     * @returns 
     */



}
