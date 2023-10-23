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
var react_1 = require("react");
var router_1 = require("next/router");
var DropdownMenu_1 = require("@/components/Dropdowns/DropdownMenu");
var link_1 = require("next/link");
var Paginator_1 = require("@/components/Paginators/Paginator");
var solid_1 = require("@heroicons/react/solid");
var api_routes_constants_1 = require("@/constants/api.routes.constants");
var chip_1 = require("@/components/Chip/chip");
var Colors_utils_1 = require("@/utils/Colors.utils");
var EntitiesPage = function (_a) {
    var entities = _a.entities;
    var router = (0, router_1.useRouter)();
    var handleEdit = function (entityId) {
        router.push("/entities/put/".concat(entityId));
    };
    var findEntityName = function (entityId, entities) {
        var entity = entities.find(function (e) { return e.id === entityId; });
        if (entity) {
            return entity.name;
        }
        else {
            return "Entity not found";
        }
    };
    var _b = (0, react_1.useState)(entities), currententities = _b[0], setCurrententities = _b[1];
    var handleDelete = function (entityId) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch("".concat(api_routes_constants_1.API_ROUTES.ENTITY_NAME, "/").concat(entityId), {
                            method: 'DELETE',
                        })];
                case 1:
                    response = _a.sent();
                    if (response.ok) {
                        console.log("".concat(findEntityName(entityId, entities), " with ID ").concat(entityId, " deleted successfully."));
                        setCurrententities(currententities.filter(function (tag) { return tag.id !== entityId; }));
                    }
                    else {
                        console.error("Error deleting ".concat(findEntityName(entityId, entities), " with ID ").concat(entityId, "."));
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    if (error_1 instanceof Error) {
                        console.error("Error deleting ".concat(findEntityName(entityId, entities), " with ID ").concat(entityId, ": ").concat(error_1.message));
                    }
                    else {
                        console.error("An unexpected error occurred.");
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var options = function (entityId) { return [
        // @ts-ignore
        {
            text: 'Modifier',
            Icon: solid_1.PencilAltIcon,
            color: '#3490dc',
            action: function () { return handleEdit(entityId); },
        },
        {
            text: 'Supprimer',
            Icon: solid_1.XCircleIcon,
            color: '#e3342f',
            action: function () { return handleDelete(entityId); },
        },
    ]; };
    var _c = (0, react_1.useState)(5), itemsPerPage = _c[0], setItemsPerPage = _c[1];
    var _d = (0, react_1.useState)(1), currentPage = _d[0], setCurrentPage = _d[1];
    var totalPages = Math.ceil(currententities.length / itemsPerPage);
    var handlePageChange = function (pageNumber) {
        if (pageNumber < 1 || pageNumber > totalPages) {
            return;
        }
        setCurrentPage(pageNumber);
    };
    var handleItemsPerPageChange = function (newItemsPerPage) {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
    };
    var indexOfLastTag = currentPage * itemsPerPage;
    var indexOfFirstTag = indexOfLastTag - itemsPerPage;
    var displayedentities = currententities.slice(indexOfFirstTag, indexOfLastTag);
    var renderTableHeaders = function () {
        if (displayedentities.length > 0) {
            var entityKeys = ['id', 'tagName', 'tagCategory', 'tagType', 'tagColor'];
            return (<tr className="border-b border-gray-200 text-center">
          {entityKeys.map(function (key) { return (<th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider align-middle" key={key}>
              {key}
            </th>); })}
          <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider align-middle">
            Actions
          </th>
        </tr>);
        }
        return null;
    };
    return (<div>
      <div className="flex justify-end">
        <link_1.default href="/entities/post" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Créer un {findEntityName(1, entities)}
        </link_1.default>
      </div>
      {entities.length === 0 ? (<div className='flex justify-center mt-5'>
          <p className="text-gray-500 text-lg">No entities found.</p>
        </div>) : (<div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {renderTableHeaders()}
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {displayedentities.map(function (entity) { return (<tr key={entity.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 text-center align-middle">{entity.id}</td>
                  <td className="px-6 py-4  text-center align-middle">{entity.name}</td>
                  <td className="px-6 py-4 text-center align-middle"> {entity.type} </td>
                  <td className="px-6 py-4 text-center align-middle"> {entity.category} </td>
                  <td className="px-6 py-4 text-center align-middle">
                    {entity.color && (<chip_1.default backgroungColor={Colors_utils_1.randomColor.toString()} textContent={(0, Colors_utils_1.getContrastingTextColor)(entity.name)}/>)}
                  </td>
                  <td className="px-6 py-4 align-middle text-center">
                    <DropdownMenu_1.default options={options(entity.id)}/>
                  </td>
                </tr>); })}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            {entities.length > itemsPerPage && (<Paginator_1.default currentPage={currentPage} totalPages={totalPages} itemsPerPage={itemsPerPage} onPageChange={handlePageChange} onItemsPerPageChange={handleItemsPerPageChange} items={entities}/>)}
          </div>
        </div>)}
    </div>);
};
exports.default = EntitiesPage;
var getServerSideProps = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, entities;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("".concat(api_routes_constants_1.API_ROUTES.ENTITY_NAME))];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                entities = _a.sent();
                return [2 /*return*/, {
                        props: {
                            entities: entities,
                        },
                    }];
        }
    });
}); };
exports.getServerSideProps = getServerSideProps;
