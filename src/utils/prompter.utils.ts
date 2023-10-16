import inquirer, {InputQuestion, Question, Answers, PasswordQuestion} from 'inquirer';
import { QuestionKeys, QUESTIONS } from '../resources/en/en.resource.js';
import {ListOrCheckboxQuestion, QuestionType} from './Questions.type.js';
import * as fs from "fs";
import { Language } from './language.utils.js';


interface CustomOptions {
    message?: string;
    default?: any;
    choices?: string[];

    // ... any other parameters you might want to customize
}

export class Prompter {
    private language: Language;

    constructor(language: Language = Language.EN) {
        this.language = language;
        // Directly use QUESTIONS from the imported resource
    }

    public async ask(
        questionKey: QuestionKeys,
        options?: CustomOptions | string
    ): Promise<string | undefined | null> {
        try {
            const questionData = QUESTIONS[String(questionKey)];

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
            return answer.response;

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

    public async askMultiple(questionKeys: QuestionKeys[]): Promise<Record<string, any>> {
        const responses: Record<string, any> = {};
        for (const key of questionKeys) {
            responses[key] = await this.ask(key);
        }
        return responses;
    }
}
