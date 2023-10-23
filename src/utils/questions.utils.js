"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAllSelectionFilter = void 0;
function generateAllSelectionFilter(choices, allChoice) {
    if (allChoice === void 0) { allChoice = "all"; }
    return function filterFunction(answers) {
        if (answers.includes(allChoice)) {
            return choices;
        }
        return answers;
    };
}
exports.generateAllSelectionFilter = generateAllSelectionFilter;
