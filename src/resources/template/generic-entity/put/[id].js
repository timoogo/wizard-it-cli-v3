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
exports.getServerSideProps = void 0;
var react_1 = require("react");
var router_1 = require("next/router");
var api_routes_constants_1 = require("@/constants/api.routes.constants");
var fa_1 = require("react-icons/fa");
var TAG_TYPES = ['offline', 'online', 'both'];
var TAG_CATEGORIES = ['GENERAL', 'SPECIFIC'];
var PutTag = function (_a) {
    var tag = _a.tag;
    var router = (0, router_1.useRouter)();
    var _b = (0, react_1.useState)(tag.tagName), displayedTagName = _b[0], setDisplayedTagName = _b[1];
    var _c = (0, react_1.useState)({
        tagCategory: tag.tagCategory,
        tagName: tag.tagName,
        tagType: tag.tagType,
        tagColor: '',
    }), formData = _c[0], setFormData = _c[1];
    var _d = (0, react_1.useState)(false), isFormComplete = _d[0], setIsFormComplete = _d[1];
    var _e = (0, react_1.useState)({
        tagName: false,
        tagColor: false,
        tagCategory: false,
        tagType: false,
    }), fieldModifiedStatus = _e[0], setFieldModifiedStatus = _e[1];
    var _f = (0, react_1.useState)(false), colorPickerOpen = _f[0], setColorPickerOpen = _f[1];
    (0, react_1.useEffect)(function () {
        setDisplayedTagName(formData.tagName);
        if (formData.tagType && formData.tagCategory && formData.tagName) {
            setIsFormComplete(true);
        }
        else {
            setIsFormComplete(false);
        }
    }, [formData.tagName, formData.tagType, formData.tagCategory]);
    var handleChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
        });
        var isInputModified = value !== tag[name];
        setFieldModifiedStatus(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = isInputModified, _a)));
        });
    };
    var randomColor = function () {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    var handleColorPickerToggle = function () {
        setColorPickerOpen(!colorPickerOpen);
    };
    var handleColorChange = function (e) {
        setFormData(function (prev) { return (__assign(__assign({}, prev), { tagColor: e.target.value })); });
    };
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var finalData, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    finalData = __assign(__assign({}, formData), { tagColor: formData.tagColor || randomColor() });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost:3001/api/tags/".concat(tag.id), {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(finalData),
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Erreur lors de la modification du tag');
                    }
                    router.push('/');
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    if (error_1 instanceof Error) {
                        console.error(error_1.message);
                    }
                    else {
                        console.error("Une erreur inattendue s'est produite.");
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <h1 className="ml-16 text-3xl font-bold mb-4">
        Modify the Tag {displayedTagName}
      </h1>
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="px-4 py-10 bg-white shadow-lg sm:rounded-lg sm:p-20">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nom Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Nom:
              </label>
              <input type="text" name="tagName" value={formData.tagName} onChange={handleChange} required className={"mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ".concat(fieldModifiedStatus.tagName ? 'border-yellow-500' : '')}/>
              {fieldModifiedStatus.tagName && (<fa_1.FaCheck className="absolute top-1/2 right-4 transform -translate-y-1/2 text-green-500"/>)}
            </div>

            {/* Couleur Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Couleur:
              </label>
              <div className="flex">
                <input type="text" name="tagColor" value={formData.tagColor} onChange={handleChange} className={"mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ".concat(fieldModifiedStatus.tagColor ? 'border-yellow-500' : '')}/>
                <button type="button" className="ml-2 p-1 bg-blue-500 text-white rounded-md" onClick={handleColorPickerToggle}>
                  Pick Color
                </button>
              </div>
              {colorPickerOpen && (<input type="color" value={formData.tagColor} onChange={handleColorChange} className="mt-1 block"/>)}
              {fieldModifiedStatus.tagColor && (<fa_1.FaCheck className="absolute top-1/2 right-4 transform -translate-y-1/2 text-green-500"/>)}
            </div>
            {/* Catégorie Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Catégorie:
              </label>
              <select name="tagCategory" value={formData.tagCategory} onChange={handleChange} required className={"mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ".concat(fieldModifiedStatus.tagCategory ? 'border-yellow-500' : '')}>
                <option value="" disabled>
                  Select a category
                </option>
                {TAG_CATEGORIES.map(function (category) { return (<option key={category} value={category}>
                    {category}
                  </option>); })}
              </select>
              {fieldModifiedStatus.tagCategory && (<fa_1.FaCheck className="absolute top-1/2 right-4 transform -translate-y-1/2 text-green-500"/>)}
            </div>

            {/* Type Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type:
              </label>
              <select name="tagType" value={formData.tagType} onChange={handleChange} required className={"mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ".concat(fieldModifiedStatus.tagType ? 'border-yellow-500' : '')}>
                <option value="" disabled>
                  Select a type
                </option>
                {TAG_TYPES.map(function (type) { return (<option key={type} value={type}>
                    {type}
                  </option>); })}
              </select>
              {fieldModifiedStatus.tagType && (<fa_1.FaCheck className="absolute top-1/2 right-4 transform -translate-y-1/2 text-green-500"/>)}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button type="submit" disabled={!isFormComplete} className={"px-6 py-2 rounded-md text-white transition duration-200 ease-in-out ".concat(isFormComplete
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-gray-400 cursor-not-allowed')}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>);
};
exports.default = PutTag;
// Get server-side props
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
                        throw new Error('Failed to fetch tag');
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
