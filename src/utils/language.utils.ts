
export enum Language {
  EN = "English (US)",
  FR = "Français (FR)",
}

// Liste de toutes les langues supportées par la CLI dans un tableau
export const LANGUAGES: Language[] = [Language.EN, Language.FR];

export interface SystemLanguageInfo {
  fullLanguage: string;
  langCode: Language;
}

export enum Separator {
  UNDERSCORE = "_",
  DASH = "-",
}

// Constantes pour les chaînes codées en dur
const DEFAULT_LOCALE = 'en_US';
const LOCALE_FR = 'fr_FR';
const LANG_CODE_FR = 'fr';

export const getSystemLanguage = (): SystemLanguageInfo => {
  const systemLocale = process.env.LANG || DEFAULT_LOCALE;
  const [langCode, ] = systemLocale.split(Separator.UNDERSCORE);
  
  // Vérifiez si langCode correspond à un des codes de langue définis
  const fullLanguage = langCode === LANG_CODE_FR ? LOCALE_FR : DEFAULT_LOCALE;
  const language = langCode === LANG_CODE_FR ? Language.FR : Language.EN;

  return { fullLanguage, langCode: language };
};

export type Questions = Record<string, string>;
export type ErrorMessages = Record<string, string>;

export interface Resources {
  QUESTIONS: Questions;
  ERROR_MESSAGES: ErrorMessages;
}

// Ici, vous devriez remplir les ressources linguistiques pour chaque langue.
const LANGUAGE_RESOURCES: Record<Language, Resources> = {
  [Language.EN]: {
    QUESTIONS: {},
    ERROR_MESSAGES: {},
  },
  [Language.FR]: {
    QUESTIONS: {},
    ERROR_MESSAGES: {},
  },
};

let currentLang: Language = getSystemLanguage().langCode;

export const getCurrentLang = (): Language => {
  return currentLang;
};

export const setCurrentLang = (targetedLang: Language): void => {
  currentLang = targetedLang;
};

export const setLangToSystem = (): void => {
  currentLang = getSystemLanguage().langCode;
};

export function getTranslation(key: string, resourceType: keyof Resources): string | undefined {
  const resources = LANGUAGE_RESOURCES[currentLang];
  const resource = resources[resourceType];
  return resource[key];
}

export function getQuestionTranslation(key: string): string {
  return getTranslation(key, "QUESTIONS") || '';
}

export function getErrorMessageTranslation(key: string): string {
  return getTranslation(key, "ERROR_MESSAGES") || '';
}

export enum StringType {
  CamelCase,
  CapitalizedCase,
  SpacesToUnderscores,
  CamelCaseToUnderscores
}

// function transformString(input: string, type: StringType): string {
//     switch (type) {
//         case StringType.CamelCase:
//             return input.replace(/_([a-z])/g, (g) => g[1]!.toUpperCase());

//         case StringType.CapitalizedCase:
//             return input.charAt(0).toUpperCase() + input.slice(1);

//         case StringType.SpacesToUnderscores:
//             return input.replace(/ /g, "_");

//         case StringType.CamelCaseToUnderscores:
//             return input.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();

//         default:
//             return input;
//     }
// }
