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
// @ts-nocheck
var react_1 = require("react");
var router_1 = require("next/router");
// Options pour les sélecteurs
var TAG_TYPES = ['offline', 'online', 'both'];
var TAG_CATEGORIES = ['GENERAL', 'SPECIFIC'];
var PostTag = function () {
    var router = (0, router_1.useRouter)();
    var _a = (0, react_1.useState)({
        tagCategory: TAG_CATEGORIES[0],
        tagName: '',
        tagType: TAG_TYPES[0],
        tagColor: '',
    }), formData = _a[0], setFormData = _a[1];
    var _b = (0, react_1.useState)(false), isFormComplete = _b[0], setIsFormComplete = _b[1];
    var handleChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
        });
        // Vérifiez si toutes les données requises sont remplies.
        // Dans cet exemple, je suppose que tagType et tagCategory sont les seules données requises.
        // Si ce n'est pas le cas, ajustez cette logique en conséquence.
        if (formData.tagType && formData.tagCategory && formData.tagName) {
            setIsFormComplete(true);
        }
        else {
            setIsFormComplete(false);
        }
    };
    var randomColor = function () {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
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
                    return [4 /*yield*/, fetch('http://localhost:3001/api/tags', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(finalData),
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Erreur lors de la création du tag');
                    }
                    // Redirection vers la page d'accueil (index)
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
    <h1 className='ml-16 text-3xl font-bold mb-4'>Create a Tag</h1>
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="px-4 py-10 bg-white shadow-lg sm:rounded-lg sm:p-20">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nom:
              </label>
              <input type="text" name="tagName" value={formData.tagName} onChange={handleChange} required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Couleur:
              </label>
              <input type="text" name="tagColor" value={formData.tagColor} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Catégorie:
              </label>
              <select name="tagCategory" value={formData.tagCategory} onChange={handleChange} required className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option value="" disabled selected>
                  Select a category
                </option>
                {TAG_CATEGORIES.map(function (category) { return (<option key={category} value={category}>
                    {category}
                  </option>); })}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type:
              </label>
              <select name="tagType" value={formData.tagType} onChange={handleChange} required className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option value="" disabled selected>
                  Select a type
                </option>
                {TAG_TYPES.map(function (type) { return (<option key={type} value={type}>
                    {type}
                  </option>); })}
              </select>
            </div>

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
exports.default = PostTag;
