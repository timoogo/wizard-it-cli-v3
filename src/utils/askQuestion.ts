import inquirer from 'inquirer';
import  prompt, { Question }  from 'inquirer';
import { ResourceTypes } from './Questions.type.js';
import { QUESTIONS } from '../resources/en/en.resource.js';


const allAnswers: any[] = []; // Tableau qui contiendra toutes les réponses
export const askQuestion = async <T extends Question>(questionKey: string, config: T, translationType: ResourceTypes = "QUESTIONS", description?: string): Promise<any> => {
    const questionText = getTranslation(questionKey, translationType);
    const question = {
        ...config,
        description,
        message: questionText
    };
    const answer = await inquirer.prompt([question]);
    allAnswers.push(answer[config.name!]); // Ajout de la réponse à allAnswers
    return answer[config.name!];
};

export const getTranslation = (key: string, translationType: ResourceTypes): string => {
    // @ts-ignore
    return translationType === "QUESTIONS" ? QUESTIONS[key] : ERROR_MESSAGES[key];
};