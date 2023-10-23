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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEnv = exports.testPostgresConnection = exports.createEntityDefinition = void 0;
var fs = require("fs");
var path = require("path");
var prompter_utils_js_1 = require("../utils/prompter.utils.js");
var en_resource_js_1 = require("../resources/en/en.resource.js");
var samples_constant_js_1 = require("../resources/constants/samples.constant.js");
var drivers_constant_js_1 = require("../resources/constants/drivers.constant.js");
// import pg
var pg_1 = require("pg");
var utils_cli_js_1 = require("../commands/generate/utils.cli.js");
var Client = pg_1.default.Client;
var createEntityDefinition = function () { return __awaiter(void 0, void 0, void 0, function () {
    var prompter, entityDefinitionPath, data, content, randomIndex, entityName, columns, _a, _b, entity;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                prompter = new prompter_utils_js_1.Prompter();
                entityDefinitionPath = path.join(utils_cli_js_1.WIZGEN_FOLDER, utils_cli_js_1.WIZGEN_ENTITY_DEFINITION_FILE);
                data = {
                    entities: [],
                    version: 1
                };
                if (fs.existsSync(entityDefinitionPath)) {
                    content = fs.readFileSync(entityDefinitionPath, 'utf-8');
                    data = JSON.parse(content);
                    data.version++;
                }
                randomIndex = Math.floor(Math.random() * samples_constant_js_1.ENTITIES_NAME_SAMPLES.length);
                return [4 /*yield*/, prompter.ask(en_resource_js_1.QuestionsKeysEnum.ENTITY_NAME, samples_constant_js_1.ENTITIES_NAME_SAMPLES[randomIndex])];
            case 1:
                entityName = _c.sent();
                if (!entityName) {
                    console.error("Le nom de l'entité n'est pas défini.");
                    return [2 /*return*/];
                }
                _a = [[]];
                return [4 /*yield*/, (0, utils_cli_js_1.useDefaultProperties)(prompter)];
            case 2:
                _b = [__spreadArray.apply(void 0, _a.concat([_c.sent(), true]))];
                return [4 /*yield*/, (0, utils_cli_js_1.getColumnDetails)(prompter)];
            case 3:
                columns = __spreadArray.apply(void 0, _b.concat([_c.sent(), true]));
                entity = {
                    entityName: entityName,
                    columns: columns
                };
                data.entities.push(entity);
                return [4 /*yield*/, (0, utils_cli_js_1.saveEntityDefinition)(data, entityDefinitionPath)];
            case 4:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.createEntityDefinition = createEntityDefinition;
var appendEntityDefinition = function () { return __awaiter(void 0, void 0, void 0, function () {
    var prompter, entityDefinitionPath, data, content, entityNames, selectedEntityName, selectedEntity, columns, _a, _b;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                prompter = new prompter_utils_js_1.Prompter();
                entityDefinitionPath = path.join(utils_cli_js_1.WIZGEN_FOLDER, utils_cli_js_1.WIZGEN_ENTITY_DEFINITION_FILE);
                if (fs.existsSync(entityDefinitionPath)) {
                    content = fs.readFileSync(entityDefinitionPath, 'utf-8');
                    data = JSON.parse(content);
                }
                else {
                    console.error("Entity definition file does not exist. Consider creating a new entity first.");
                    return [2 /*return*/];
                }
                entityNames = data.entities.map(function (entity) { return entity.entityName; });
                return [4 /*yield*/, prompter.ask(en_resource_js_1.QuestionsKeysEnum.SELECT_ENTITY, {
                        choices: entityNames
                    })];
            case 1:
                selectedEntityName = _d.sent();
                selectedEntity = data.entities.find(function (entity) { return entity.entityName === selectedEntityName; });
                if (!selectedEntity) {
                    console.error("Selected entity not found.");
                    return [2 /*return*/];
                }
                _a = [[]];
                return [4 /*yield*/, (0, utils_cli_js_1.useDefaultProperties)(prompter)];
            case 2:
                _b = [__spreadArray.apply(void 0, _a.concat([_d.sent(), true]))];
                return [4 /*yield*/, (0, utils_cli_js_1.getColumnDetails)(prompter)];
            case 3:
                columns = __spreadArray.apply(void 0, _b.concat([_d.sent(), true]));
                (_c = selectedEntity.columns).push.apply(_c, columns);
                return [4 /*yield*/, (0, utils_cli_js_1.saveEntityDefinition)(data, entityDefinitionPath)];
            case 4:
                _d.sent();
                return [2 /*return*/];
        }
    });
}); };
var testPostgresConnection = function (connectionString) { return __awaiter(void 0, void 0, void 0, function () {
    var client, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                client = new Client({
                    connectionString: connectionString
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, client.connect()];
            case 2:
                _a.sent();
                console.log('Connexion à PostgreSQL réussie !');
                return [4 /*yield*/, client.end()];
            case 3:
                _a.sent();
                return [2 /*return*/, true];
            case 4:
                error_1 = _a.sent();
                console.error('Erreur lors de la connexion à PostgreSQL :', error_1);
                return [2 /*return*/, false];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.testPostgresConnection = testPostgresConnection;
var generateEnv = function () { return __awaiter(void 0, void 0, void 0, function () {
    var prompter, isConnected, databaseName, driver, hostName, userName, password, port, testConnectionString, client, e_1, createDbClient, dbExists, replaceConfirm, envPath, connectionString, existingContent, databaseUrlRegex;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                prompter = new prompter_utils_js_1.Prompter();
                isConnected = false;
                _a.label = 1;
            case 1:
                if (!!isConnected) return [3 /*break*/, 14];
                return [4 /*yield*/, prompter.ask(en_resource_js_1.QuestionsKeysEnum.DATABASE_NAME)];
            case 2:
                databaseName = _a.sent();
                return [4 /*yield*/, prompter.ask(en_resource_js_1.QuestionsKeysEnum.SELECT_DRIVER)];
            case 3:
                driver = _a.sent();
                if (!(driver === drivers_constant_js_1.Driver.POSTGRES)) return [3 /*break*/, 8];
                return [4 /*yield*/, prompter.ask(en_resource_js_1.QuestionsKeysEnum.HOST_NAME, 'localhost')];
            case 4:
                hostName = _a.sent();
                return [4 /*yield*/, prompter.ask(en_resource_js_1.QuestionsKeysEnum.USER_NAME, 'postgres')];
            case 5:
                userName = _a.sent();
                return [4 /*yield*/, prompter.ask(en_resource_js_1.QuestionsKeysEnum.PASSWORD, 'root')];
            case 6:
                password = _a.sent();
                return [4 /*yield*/, prompter.ask(en_resource_js_1.QuestionsKeysEnum.PORT, '5432')];
            case 7:
                port = _a.sent();
                _a.label = 8;
            case 8:
                if (!(driver === drivers_constant_js_1.Driver.POSTGRES)) return [3 /*break*/, 13];
                testConnectionString = "postgresql://".concat(userName, ":").concat(password, "@").concat(hostName, ":").concat(port, "/postgres");
                client = new Client({ connectionString: testConnectionString });
                _a.label = 9;
            case 9:
                _a.trys.push([9, 12, , 13]);
                return [4 /*yield*/, client.connect()];
            case 10:
                _a.sent();
                isConnected = true;
                return [4 /*yield*/, client.end()];
            case 11:
                _a.sent();
                console.log("Connexion réussie à PostgreSQL !");
                return [3 /*break*/, 13];
            case 12:
                e_1 = _a.sent();
                console.error("Erreur lors de la connexion à PostgreSQL :", e_1);
                console.log("Veuillez entrer à nouveau les informations de connexion.");
                return [3 /*break*/, 13];
            case 13: return [3 /*break*/, 1];
            case 14:
                createDbClient = new Client({
                    connectionString: "postgresql://".concat(userName, ":").concat(password, "@").concat(hostName, ":").concat(port, "/postgres")
                });
                return [4 /*yield*/, createDbClient.connect()];
            case 15:
                _a.sent();
                return [4 /*yield*/, createDbClient.query("SELECT datname FROM pg_database WHERE datname = '".concat(databaseName, "';"))];
            case 16:
                dbExists = _a.sent();
                if (!(dbExists.rows.length > 0)) return [3 /*break*/, 21];
                return [4 /*yield*/, prompter.ask(en_resource_js_1.QuestionsKeysEnum.CONFIRM_DELETE_DATABASE)];
            case 17:
                replaceConfirm = _a.sent();
                if (!!replaceConfirm) return [3 /*break*/, 19];
                console.log("Base de données existante non remplacée. Opération terminée.");
                return [4 /*yield*/, createDbClient.end()];
            case 18:
                _a.sent();
                return [2 /*return*/];
            case 19: return [4 /*yield*/, createDbClient.query("DROP DATABASE ".concat(databaseName, ";"))];
            case 20:
                _a.sent();
                _a.label = 21;
            case 21: return [4 /*yield*/, createDbClient.query("CREATE DATABASE ".concat(databaseName, ";"))];
            case 22:
                _a.sent();
                console.log("Base de donn\u00E9es '".concat(databaseName, "' cr\u00E9\u00E9e avec succ\u00E8s !"));
                return [4 /*yield*/, createDbClient.end()];
            case 23:
                _a.sent();
                envPath = path.join(process.cwd(), '.env');
                connectionString = '';
                switch (driver) {
                    case drivers_constant_js_1.Driver.MYSQL:
                        connectionString = "DATABASE_URL=\"mysql://".concat(userName, ":").concat(password, "@").concat(hostName, ":").concat(port, "/").concat(databaseName, "\"\n");
                        break;
                    case drivers_constant_js_1.Driver.POSTGRES:
                        connectionString = "DATABASE_URL=\"postgresql://".concat(userName, ":").concat(password, "@").concat(hostName, ":").concat(port, "/").concat(databaseName, "?schema=public\"\n");
                        break;
                    case drivers_constant_js_1.Driver.MARIADB:
                        connectionString = "DATABASE_URL=\"mariadb://".concat(userName, ":").concat(password, "@").concat(hostName, ":").concat(port, "/").concat(databaseName, "\"\n");
                        break;
                    default:
                        console.log('Driver non reconnu.');
                        return [2 /*return*/];
                }
                existingContent = fs.readFileSync(envPath, 'utf-8');
                databaseUrlRegex = /^DATABASE_URL=.*$/m;
                if (databaseUrlRegex.test(existingContent)) {
                    existingContent = existingContent.replace(databaseUrlRegex, connectionString);
                }
                else {
                    // Si DATABASE_URL n'existe pas, ajoutez simplement la nouvelle chaîne de connexion à la fin
                    existingContent += "\n".concat(connectionString, "\n");
                }
                // Écrivez le contenu mis à jour dans le fichier .env
                fs.writeFileSync(envPath, existingContent);
                console.log("Cha\u00EEne de connexion pour ".concat(driver, " ajout\u00E9e ou mise \u00E0 jour dans le fichier .env."));
                console.log(existingContent);
                return [2 /*return*/];
        }
    });
}); };
exports.generateEnv = generateEnv;
