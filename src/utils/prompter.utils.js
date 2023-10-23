"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prompter = void 0;
var inquirer_1 = require("inquirer");
var en_resource_js_1 = require("../resources/en/en.resource.js");
var fs = require("fs");
var language_utils_js_1 = require("./language.utils.js");
var Prompter = /** @class */ (function () {
    function Prompter(language) {
        if (language === void 0) { language = language_utils_js_1.Language.EN; }
        this.language = language;
        // Directly use QUESTIONS from the imported resource
    }
    Prompter.prototype.ask = function (questionKey, options) {
        return __awaiter(this, void 0, void 0, function () {
            var questionData, isCustomOptions, finalQuestionData, finalInquirerQuestion, answer, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        questionData = en_resource_js_1.QUESTIONS[String(questionKey)];
                        if (!questionData) {
                            console.warn("Unknown question key: ".concat(questionKey));
                            return [2 /*return*/, null];
                        }
                        isCustomOptions = typeof options === 'object';
                        finalQuestionData = isCustomOptions
                            ? __assign(__assign({}, questionData), options) : questionData;
                        finalInquirerQuestion = void 0;
                        switch (finalQuestionData.type) {
                            case 'list':
                            case 'checkbox':
                                if ('choices' in finalQuestionData) {
                                    finalInquirerQuestion = {
                                        type: finalQuestionData.type,
                                        name: 'response',
                                        message: finalQuestionData.message,
                                        choices: finalQuestionData.choices,
                                        default: isCustomOptions ? options.default : finalQuestionData.default,
                                    };
                                }
                                else {
                                    finalInquirerQuestion = {
                                        type: 'input',
                                        name: 'response',
                                        message: finalQuestionData.message,
                                        default: isCustomOptions ? options.default : finalQuestionData.default,
                                    };
                                }
                                break;
                            case 'password':
                                finalInquirerQuestion = {
                                    type: 'password',
                                    name: 'response',
                                    message: finalQuestionData.message,
                                    mask: '*',
                                };
                                break;
                            default:
                                finalInquirerQuestion = {
                                    type: 'input',
                                    name: 'response',
                                    message: finalQuestionData.message,
                                    default: isCustomOptions ? options.default : finalQuestionData.default,
                                };
                                break;
                        }
                        return [4 /*yield*/, inquirer_1.default.prompt([finalInquirerQuestion])];
                    case 1:
                        answer = _a.sent();
                        return [2 /*return*/, answer.response];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Une erreur s'est produite lors de la pose de la question :", { error: error_1 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(Prompter.prototype, "entities", {
        /**
         * Get all created entities from the .wizgen/entity.definition.json file
         * @returns a list of entity names
         **/
        get: function () {
            var content = fs.readFileSync('dist/.wizgen/entity.definition.json', 'utf-8');
            var entityDefinitionPath = 'dist/.wizgen/entity.definition.json';
            if (!fs.existsSync(entityDefinitionPath)) {
                return [];
            }
            else {
                // read the file
                fs.readFileSync(entityDefinitionPath, 'utf-8');
                // parse the file
                var data = JSON.parse(content);
            }
            return '';
        },
        enumerable: false,
        configurable: true
    });
    /**
     *
     * @param questionKeys
     * @returns
     */
    Prompter.prototype.askMultiple = function (questionKeys) {
        return __awaiter(this, void 0, void 0, function () {
            var responses, _i, questionKeys_1, key, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        responses = {};
                        _i = 0, questionKeys_1 = questionKeys;
                        _c.label = 1;
                    case 1:
                        if (!(_i < questionKeys_1.length)) return [3 /*break*/, 4];
                        key = questionKeys_1[_i];
                        _a = responses;
                        _b = key;
                        return [4 /*yield*/, this.ask(key)];
                    case 2:
                        _a[_b] = _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, responses];
                }
            });
        });
    };
    return Prompter;
}());
exports.Prompter = Prompter;
