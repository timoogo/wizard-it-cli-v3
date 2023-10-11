import inquirer, {ListQuestion, CheckboxQuestion, InputQuestion, Question, Answers} from 'inquirer';
import { QuestionKeys, QUESTIONS } from '../resources/en/en.resource.js';

import * as fs from "fs";
import { Language } from './language.utils.js';

type QuestionType = 'input' | 'list' | 'confirm' | 'checkbox';  // Ajoutez d'autres types de questions au besoin

interface CustomQuestion {
    type: QuestionType;
    message: string;
    choices?: string[];  // Seulement pertinent pour 'list' et 'checkbox'
}

export class Prompter {
    private language: Language;

    constructor(language: Language = Language.EN) {
        this.language = language;
        // Directly use QUESTIONS from the imported resource
    }

    public async ask(questionKey: QuestionKeys, defaultValue?: string): Promise<string | undefined | null> {
        try {
            const questionData = QUESTIONS[String(questionKey)];

            if (!questionData) {
                console.warn(`Unknown question key: ${questionKey}`);
                return null;
            }
            if (questionData === undefined) {
                console.warn(`No question data for key: ${questionKey}`);
                return null;
            }


            let finalInquirerQuestion: Question;

            if ('choices' in questionData && (questionData.type === 'list' || questionData.type === 'checkbox')) {
                const choiceQuestion: ListQuestion | CheckboxQuestion = {
                    type: questionData.type,
                    name: 'response',
                    message: questionData.message,
                    choices: questionData.choices,
                    default: questionData.default,
                };
                finalInquirerQuestion = choiceQuestion;
            } else {
                const inputQuestion: InputQuestion = {
                    type: 'input',
                    name: 'response',
                    message: questionData.message,
                    default: defaultValue || questionData.default,
                };
                finalInquirerQuestion = inputQuestion;
            }

            const answer: Answers = await inquirer.prompt([finalInquirerQuestion]);
            //    console.log(`Réponse obtenue: ${answer}`);
            console.log({answer}, typeof answer);
            return answer.response;

        } catch (error) {
            console.error("Une erreur s'est produite lors de la pose de la question :", {error});
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

    public async askMultiple(questionKeys: QuestionKeys[]): Promise<Record<string, any>> {
        const responses: Record<string, any> = {};
        for (const key of questionKeys) {
            responses[key] = await this.ask(key);
        }
        return responses;
    }
}
