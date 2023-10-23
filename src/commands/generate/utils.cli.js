"use strict";
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
exports.saveEntityDefinition = exports.getColumnDetails = exports.useDefaultProperties = exports.WIZGEN_ENTITY_DEFINITION_FILE = exports.WIZGEN_FOLDER = void 0;
var prompter_utils_js_1 = require("../../utils/prompter.utils.js");
var en_resource_js_1 = require("../../resources/en/en.resource.js");
var default_properties_js_1 = require("../../utils/default.properties.js");
var fs_1 = require("fs");
exports.WIZGEN_FOLDER = 'dist/.wizgen';
exports.WIZGEN_ENTITY_DEFINITION_FILE = 'entity.definition.json';
var useDefaultProperties = function (prompter) { return __awaiter(void 0, void 0, void 0, function () {
    var useDefaults;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prompter.ask(en_resource_js_1.QuestionsKeysEnum.CONFIRM_DEFAULT_PROPERTIES)];
            case 1:
                useDefaults = (_a.sent()) === 'yes';
                if (useDefaults) {
                    return [2 /*return*/, Object.values(default_properties_js_1.DEFAULT_PROPERTIES).filter(function (prop) { return prop !== null && prop !== undefined; })];
                }
                return [2 /*return*/, []];
        }
    });
}); };
exports.useDefaultProperties = useDefaultProperties;
var getColumnDetails = function (prompter) { return __awaiter(void 0, void 0, void 0, function () {
    var columns, addMoreColumns, columnName, columnProperty, columnType, isPrimary, isGenerated, isUnique, isNullable;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                columns = [];
                addMoreColumns = true;
                _a.label = 1;
            case 1:
                if (!addMoreColumns) return [3 /*break*/, 11];
                return [4 /*yield*/, prompter.ask(en_resource_js_1.QuestionsKeysEnum.COLUMN_NAME)];
            case 2:
                columnName = _a.sent();
                if (!(columnName && default_properties_js_1.DEFAULT_PROPERTIES.hasOwnProperty(columnName))) return [3 /*break*/, 3];
                columnProperty = default_properties_js_1.DEFAULT_PROPERTIES[columnName];
                if (columnProperty) {
                    columns.push(columnProperty);
                }
                return [3 /*break*/, 9];
            case 3: return [4 /*yield*/, prompter.ask(en_resource_js_1.QuestionsKeysEnum.COLUMN_TYPE)];
            case 4:
                columnType = _a.sent();
                return [4 /*yield*/, prompter.ask(en_resource_js_1.QuestionsKeysEnum.IS_PRIMARY)];
            case 5:
                isPrimary = (_a.sent()) === 'yes';
                return [4 /*yield*/, prompter.ask(en_resource_js_1.QuestionsKeysEnum.IS_GENERATED)];
            case 6:
                isGenerated = (_a.sent()) === 'yes';
                return [4 /*yield*/, prompter.ask(en_resource_js_1.QuestionsKeysEnum.IS_UNIQUE)];
            case 7:
                isUnique = (_a.sent()) === 'yes';
                return [4 /*yield*/, prompter.ask(en_resource_js_1.QuestionsKeysEnum.IS_NULABLE)];
            case 8:
                isNullable = (_a.sent()) === 'yes';
                columns.push({
                    columnName: columnName,
                    type: columnType,
                    isPrimary: isPrimary,
                    isGenerated: isGenerated,
                    isUnique: isUnique,
                    nullable: isNullable,
                    default: ""
                });
                _a.label = 9;
            case 9: return [4 /*yield*/, prompter.ask(en_resource_js_1.QuestionsKeysEnum.MORE_COLUMNS)];
            case 10:
                addMoreColumns = (_a.sent()) === 'yes';
                return [3 /*break*/, 1];
            case 11: return [2 /*return*/, columns];
        }
    });
}); };
exports.getColumnDetails = getColumnDetails;
var saveEntityDefinition = function (data, entityDefinitionPath) { return __awaiter(void 0, void 0, void 0, function () {
    var saveToJson;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (new prompter_utils_js_1.Prompter()).ask(en_resource_js_1.QuestionsKeysEnum.SAVE_TO_JSON)];
            case 1:
                saveToJson = (_a.sent()) === 'yes';
                if (saveToJson) {
                    fs_1.default.writeFileSync(entityDefinitionPath, JSON.stringify(data, null, 4));
                    console.log("Entity generated:", "".concat(exports.WIZGEN_FOLDER, "/").concat(exports.WIZGEN_ENTITY_DEFINITION_FILE));
                }
                return [2 /*return*/];
        }
    });
}); };
exports.saveEntityDefinition = saveEntityDefinition;
