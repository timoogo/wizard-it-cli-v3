import path from "path";

export const __dirname = path.resolve();
export const directoryName = path.join(`${__dirname}/src`, ".wizgen");

export const __resources = path.join(__dirname, "src/resources");


export const WIZGEN_FOLDER = "dist/.wizgen";
export const WIZGEN_ENTITY_DEFINITION_FILE = 'entity.definition.json';
export const WIZGEN_ENTITY_DEFINITION_FILE_PATH = `${WIZGEN_FOLDER}/${WIZGEN_ENTITY_DEFINITION_FILE}`;