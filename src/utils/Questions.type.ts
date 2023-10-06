import { Question as InquirerQuestion } from 'inquirer';

type QuestionType = 'input' | 'list' | 'confirm' | 'checkbox' | 'password';

interface BaseQuestion extends Omit<InquirerQuestion, 'message' | 'type'> {
    type: QuestionType;
    message: string | ((answers: any) => string | Promise<string>);
}

interface ChoiceQuestion extends BaseQuestion {
    type: 'list' | 'checkbox';
    choices: readonly string[] | string[];
}
export type ResourceTypes = "QUESTIONS" | "ERROR_MESSAGES";
export type Question = BaseQuestion | ChoiceQuestion;
export type Questions = Record<string, Question>;

