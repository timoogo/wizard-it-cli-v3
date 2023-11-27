// language.utils.ts
import {
  ErrorMessagesEnum,
  FileManagementKeysEnum,
  QuestionsKeysEnum,
  translations
} from "../resources/global/translations.js";

// A language enum based on SystemLanguageInfo
export enum LanguageCode {
  EN = "en_US",
  FR = "fr_FR",
}

export enum FullLanguageUIName {
  EN = "English",
  FR = "Français",
}

export type LanguageKeys = keyof typeof LanguageCode;

export const LANGUAGES: LanguageCode[] = [LanguageCode.EN, LanguageCode.FR];
export const ALL_FULL_LANGUAGE_UI_NAMES = Object.values(FullLanguageUIName) as FullLanguageUIName[];

export interface SystemLanguageInfo {
  fullLanguage: FullLanguageUIName;
  langCode: LanguageCode;
}

export enum Separator {
  UNDERSCORE = "_",
  DASH = "-",
}

export const DEFAULT_LOCALE: LanguageCode = 'en_US' as LanguageCode;
const LOCALE_FR: LanguageCode = 'fr_FR' as LanguageCode;

let currentLang: LanguageCode;

export const getSystemLanguage = (): SystemLanguageInfo => {
  const systemLanguage = process.env.LANG || DEFAULT_LOCALE;
  const langCode = systemLanguage.includes(LOCALE_FR) ? LanguageCode.FR : LanguageCode.EN;

  let fullLanguageName: FullLanguageUIName;
  switch (langCode) {
    case LanguageCode.EN:
      fullLanguageName = FullLanguageUIName.EN;
      break;
    case LanguageCode.FR:
      fullLanguageName = FullLanguageUIName.FR;
      break;
    default:
      fullLanguageName = FullLanguageUIName.EN;
      break;
  }

  return {
    fullLanguage: fullLanguageName,
    langCode: langCode, // Utilisez "langCode" ici au lieu de "currentLang"
  };
};


currentLang = getSystemLanguage().langCode; // Initialise currentLang ici

export function setFullLanguageName(langCode: LanguageCode): FullLanguageUIName {
  let fullLanguageName: FullLanguageUIName;
  switch (langCode) {
    case LanguageCode.EN:
      fullLanguageName = FullLanguageUIName.EN;
      break;
    case LanguageCode.FR:
      fullLanguageName = FullLanguageUIName.FR;
      break;
    default:
      fullLanguageName = FullLanguageUIName.EN;
      break;
  }
  return fullLanguageName;
}

export type Questions = Record<string, string>;
export type ErrorMessages = Record<string, string>;
export type FileManagement = Record<string, string>;

interface Resources {
  [key: string]: Record<string, string>;
}

interface Resource {
  [key: string]: string;
}

const LANGUAGE_RESOURCES: Record<LanguageCode, Resources> = {
  [LanguageCode.EN]: {
    QUESTIONS: {
      ...QuestionsKeysEnum,
      // Vos questions en anglais
    },
    ERROR_MESSAGES: {
      ...ErrorMessagesEnum,
      // Autres messages d'erreur spécifiques en anglais
    },
    FILE_MANAGEMENT: {
      ...FileManagementKeysEnum,
      // Autres messages de gestion de fichiers spécifiques en anglais
    },
  },
  [LanguageCode.FR]: {
    QUESTIONS: {
      // Vos questions en français
    },
    ERROR_MESSAGES: {
      ...QuestionsKeysEnum,
      // Autres messages d'erreur spécifiques en français
    },
    FILE_MANAGEMENT: {
      ...FileManagementKeysEnum,
      // Autres messages de gestion de fichiers spécifiques en français
    },
  },
};

export const getCurrentLang = (): LanguageCode => {
  return currentLang;
};

export const setCurrentLang = (targetedLang: LanguageCode): LanguageCode => {
    currentLang = targetedLang;
    return currentLang;
}

export const setLangToSystem = () => {
  console.log(`Setting language to system language: ${getSystemLanguage().langCode}`);
  currentLang = getSystemLanguage().langCode;
  console.log(`Language set to: ${getSystemLanguage().fullLanguage} (${getSystemLanguage().langCode})`);

};

export function getTranslation(language: LanguageCode, resource: keyof typeof translations[LanguageCode], key: string): string {
  const resourceTranslations = translations[language][resource] as Record<string, string>;
  const translation = resourceTranslations[key];
  if (translation === undefined) {
    throw new Error(`Translation key not found: ${key} in resource: ${resource} for language: ${language}`);
  }
  return translation;
}

export enum StringType {
  CamelCase,
  CapitalizedCase,
  SpacesToUnderscores,
  CamelCaseToUnderscores
}
