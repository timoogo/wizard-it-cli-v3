export function generateAllSelectionFilter(choices: string[], allChoice: string = "all"): (answers: string[]) => string[] {
    return function filterFunction(answers: string[]): string[] {
        if (answers.includes(allChoice)) {
            return choices;
        }
        return answers;
    };
}