"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringType = exports.getErrorMessageTranslation = exports.getQuestionTranslation = exports.setLangToSystem = exports.setCurrentLang = exports.getCurrentLang = exports.getSystemLanguage = exports.Separator = exports.LANGUAGES = exports.Language = void 0;
var en = require("../resources/en/en.resource.js");
var fr = require("../resources/fr/fr.resource.js");
var askQuestion_js_1 = require("../utils/askQuestion.js");
var Language;
(function (Language) {
    Language["EN"] = "English (US)";
    Language["FR"] = "Fran\u00E7ais (FR)";
})(Language || (exports.Language = Language = {}));
// list of all languages supported by the CLI inside a array
exports.LANGUAGES = [Language.EN, Language.FR];
var Separator;
(function (Separator) {
    Separator["UNDERSCORE"] = "_";
    Separator["DASH"] = "-";
})(Separator || (exports.Separator = Separator = {}));
var getSystemLanguage = function () {
    var fullLanguage = process.env.LANG || '';
    var langCode = fullLanguage.split('_')[0] || Language.EN;
    if (langCode !== Language.EN && langCode !== Language.FR) {
        return { fullLanguage: 'en_US', langCode: Language.EN };
    }
    return { fullLanguage: fullLanguage, langCode: langCode };
};
exports.getSystemLanguage = getSystemLanguage;
var LANGUAGE_RESOURCES = (_a = {},
    _a[Language.EN] = en,
    _a[Language.FR] = fr,
    _a);
var languageInfo = (0, exports.getSystemLanguage)();
var currentLang = languageInfo.langCode === "fr" ? Language.FR : Language.EN;
var getCurrentLang = function () {
    return currentLang;
};
exports.getCurrentLang = getCurrentLang;
var setCurrentLang = function (targetedLang) {
    currentLang = targetedLang;
};
exports.setCurrentLang = setCurrentLang;
var setLangToSystem = function () {
    currentLang = languageInfo.langCode === "fr" ? Language.FR : Language.EN;
};
exports.setLangToSystem = setLangToSystem;
function getQuestionTranslation(key) {
    return (0, askQuestion_js_1.getTranslation)(key, "QUESTIONS") || '';
}
exports.getQuestionTranslation = getQuestionTranslation;
function getErrorMessageTranslation(key) {
    return (0, askQuestion_js_1.getTranslation)(key, "ERROR_MESSAGES") || '';
}
exports.getErrorMessageTranslation = getErrorMessageTranslation;
var StringType;
(function (StringType) {
    StringType[StringType["CamelCase"] = 0] = "CamelCase";
    StringType[StringType["CapitalizedCase"] = 1] = "CapitalizedCase";
    StringType[StringType["SpacesToUnderscores"] = 2] = "SpacesToUnderscores";
    StringType[StringType["CamelCaseToUnderscores"] = 3] = "CamelCaseToUnderscores";
})(StringType || (exports.StringType = StringType = {}));
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
