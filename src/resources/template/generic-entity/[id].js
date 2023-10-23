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
exports.getServerSideProps = void 0;
// @ts-nocheck
var api_routes_constants_1 = require("@/constants/api.routes.constants");
var react_1 = require("react");
var TagPage = function (_a) {
    var tag = _a.tag;
    var _b = (0, react_1.useState)(tag.tagName), modifiedTagName = _b[0], setModifiedTagName = _b[1];
    var handleModifyTag = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Modifying tag...');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(api_routes_constants_1.API_ROUTES.TAGS, "/").concat(tag.id), {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ tagName: modifiedTagName }),
                        })];
                case 2:
                    response = _a.sent();
                    if (response.ok) {
                        console.log('Tag modified successfully');
                        tag.tagName = modifiedTagName;
                    }
                    else {
                        console.error('Failed to modify tag:', response.statusText);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error modifying tag:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="container mx-auto my-8">
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold mb-2">{tag.tagName}</h1>
        <input type="text" value={modifiedTagName} onChange={function (e) { return setModifiedTagName(e.target.value); }}/>
        <button onClick={handleModifyTag}>Modify Tag Name</button>
        <p className="text-gray-600 mb-4">{tag.tagCategory}</p>
        <p className="text-gray-600 mb-4">{tag.tagType}</p>
        {tag.tagColor && (<p className="text-gray-600 mb-4">
            <strong>Color:</strong> {tag.tagColor}
          </p>)}
      </div>
    </div>);
};
var getServerSideProps = function (_a) {
    var params = _a.params;
    return __awaiter(void 0, void 0, void 0, function () {
        var id, response, tag;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = params.id;
                    return [4 /*yield*/, fetch("".concat(api_routes_constants_1.API_ROUTES.TAGS, "/").concat(id))];
                case 1:
                    response = _b.sent();
                    if (!response.ok) {
                        throw new Error('Failed to fetch event');
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    tag = _b.sent();
                    return [2 /*return*/, {
                            props: {
                                tag: tag,
                            },
                        }];
            }
        });
    });
};
exports.getServerSideProps = getServerSideProps;
exports.default = TagPage;
