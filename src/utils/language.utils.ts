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

// Liste de toutes les langues supportées par la CLI dans un tableau
export const LANGUAGES: LanguageCode[] = [LanguageCode.EN, LanguageCode.FR];

export interface SystemLanguageInfo {
  fullLanguage: FullLanguageUIName;
  langCode: LanguageCode;
}

export enum Separator {
  UNDERSCORE = "_",
  DASH = "-",
}

// Constantes pour les chaînes codées en dur
const DEFAULT_LOCALE: LanguageCode = 'en_US' as LanguageCode;
const LOCALE_FR: LanguageCode = 'fr_FR' as LanguageCode;

export const getSystemLanguage = (): SystemLanguageInfo => {
  const systemLanguage = process.env.LANG || DEFAULT_LOCALE;
  const langCode = systemLanguage.includes(LOCALE_FR) ? LanguageCode.FR : LanguageCode.EN;

  // Détermine le nom complet de la langue pour l'interface utilisateur
  let fullLanguageName: FullLanguageUIName;
  switch (langCode) {
    case LanguageCode.EN:
      fullLanguageName = FullLanguageUIName.EN;
      break;
    case LanguageCode.FR:
      fullLanguageName = FullLanguageUIName.FR;
      break;
    default:
      fullLanguageName = FullLanguageUIName.EN; // Valeur par défaut
      break;
  }

  return {
    fullLanguage: fullLanguageName,
    langCode,
  };
};


export type Questions = Record<string, string>;
export type ErrorMessages = Record<string, string>;
export type FileManagement = Record<string, string>;

interface Resources {
  [key: string]: Record<string, string>;
}

interface Resource {
  [key: string]: string;
}

// Ici, vous devriez remplir les ressources linguistiques pour chaque langue.
const LANGUAGE_RESOURCES: Record<LanguageCode, Resources> = {
  [LanguageCode.EN]: {
    QUESTIONS: {
      ...QuestionsKeysEnum, // Intégration des questions
      // Vos questions en anglais
    },
    ERROR_MESSAGES: {
      ...ErrorMessagesEnum, // Intégration des messages d'erreur
      // Autres messages d'erreur spécifiques en anglais
    },
    FILE_MANAGEMENT: {
      ...FileManagementKeysEnum, // Intégration des messages de gestion de fichiers
      // Autres messages de gestion de fichiers spécifiques en anglais
    },
  },
  [LanguageCode.FR]: {
    QUESTIONS: {
      // Vos questions en français
    },
    ERROR_MESSAGES: {
      ...QuestionsKeysEnum, // Traduisez ces messages en français
      // Autres messages d'erreur spécifiques en français
    },
    FILE_MANAGEMENT: {
      ...FileManagementKeysEnum, // Traduisez ces messages en français
      // Autres messages de gestion de fichiers spécifiques en français
    },
  },
};

let currentLang: LanguageCode = getSystemLanguage().langCode;

export const getCurrentLang = (): LanguageCode => {
  return currentLang;
};

export const setCurrentLang = (targetedLang: LanguageCode): void => {
  currentLang = targetedLang;
};

export const setLangToSystem = () => {
  console.log(`Setting language to system language: ${getSystemLanguage().langCode}`);
 return  currentLang = getSystemLanguage().langCode;
};

// Exemple de vérification dans getTranslation
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

