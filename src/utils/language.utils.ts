// import * as en from "../resources/en/en.resource.js";
// import * as fr from "../resources/fr/fr.resource.js";
// import { Questions, ErrorMessages, ResourceTypes } from "./Questions.type.js";

export enum Language {
  EN = "English (US)",
  FR = "Français (FR)",
}

// interface SystemLanguageInfo {
//   fullLanguage: string;
//   langCode: string;
// }

// export enum Separator {
//   UNDERSCORE = "_",
//   DASH = "-",
// }

// export const getSystemLanguage = (): SystemLanguageInfo => {
//     const fullLanguage = process.env.LANG || '';
//     const langCode = fullLanguage.split('_')[0] || Language.EN;

//     if (langCode !== Language.EN && langCode !== Language.FR) {
//         return { fullLanguage: 'en_US', langCode: Language.EN };
//     }

//     return { fullLanguage, langCode };
// };

// const LANGUAGE_RESOURCES: Record<
//   Language,
//   Record<ResourceTypes, Record<string, string>>
// > = {
//   [Language.EN]: en,
//   [Language.FR]: fr,
// };

// const languageInfo = getSystemLanguage();
// let currentLang: Language = languageInfo.langCode === "fr" ? Language.FR : Language.EN;

// export const getCurrentLang = (): Language => {
//   return currentLang;
// };

// export const setCurrentLang = (targetedLang: Language): void => {
//   currentLang = targetedLang;
// };

// export const setLangToSystem = (): void => {
//   currentLang = languageInfo.langCode === "fr" ? Language.FR : Language.EN;
// };
// export const getTranslation = <T extends ResourceTypes>(
//     key: string,
//     type: T
// ): string => {
//     return LANGUAGE_RESOURCES[currentLang]?.[type]?.[key] || '';
// };

// export function getQuestionTranslation(key: string): string {
//     return getTranslation(key, "QUESTIONS") || '';
// }

// export function getErrorMessageTranslation(key: string): string {
//     return getTranslation(key, "ERROR_MESSAGES") || '';
// }

// export function getQuestions(): Questions {
//     return LANGUAGE_RESOURCES[currentLang]?.QUESTIONS || {};
// }
  



// export enum StringType {
//     CamelCase,
//     CapitalizedCase,
//     SpacesToUnderscores,
//     CamelCaseToUnderscores
// }

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
