
export type QuestionType = 'input' | 'list' | 'confirm' | 'checkbox' | 'password';
type BaseQuestion = {
    type: string;
    name?: string;
    message: string | ((answers: any) => string | Promise<string>);
    default?: any;
};

export type ListOrCheckboxQuestion = BaseQuestion & {
    choices: string[] | readonly string[];
};

export type InputQuestion = BaseQuestion & {
    default?: string | number | boolean | null | undefined | string[];
};

export type Question = ListOrCheckboxQuestion | InputQuestion;

export type ResourceTypes = "QUESTIONS" | "ERROR_MESSAGES";
export type Questions = Record<string, Question>;
export type Resources = Record<ResourceTypes, Questions | Record<string, string>>;
