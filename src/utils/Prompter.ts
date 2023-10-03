import inquirer, { ListQuestion, CheckboxQuestion, QuestionCollection, InputQuestion, Question } from 'inquirer';
import { Language } from './language.utils.js';
import { QuestionKeys, QUESTIONS } from '../resources/en/en.resource.js';

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
    
    public async ask(questionKey: QuestionKeys): Promise<any> {
        const questionData = QUESTIONS[String(questionKey)];
        
    
        if (!questionData) {
            console.warn(`Unknown question key: ${questionKey}`);
            return null;
        }
    
        let finalInquirerQuestion: Question;
    
        // Si la question est de type ChoiceQuestion, alors ajouter les choix
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
                default: questionData.default,
            };
            finalInquirerQuestion = inputQuestion;
        }
        
        const answer = await inquirer.prompt([finalInquirerQuestion]);
        return answer.response;
    }
    
    // Optional: A method to ask multiple questions at once
    public async askMultiple(questionKeys: QuestionKeys[]): Promise<Record<string, any>> {
        const responses: Record<string, any> = {};
        for (const key of questionKeys) {
            responses[key] = await this.ask(key);
        }
        return responses;
    }
}
