"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__resources = exports.directoryName = exports.__dirname = void 0;
var path_1 = require("path");
exports.__dirname = path_1.default.resolve();
exports.directoryName = path_1.default.join("".concat(exports.__dirname, "/src"), ".wizgen");
exports.__resources = path_1.default.join(exports.__dirname, "src/resources");
