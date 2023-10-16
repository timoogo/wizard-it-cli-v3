import path from "path";

export const __dirname = path.resolve();
export const directoryName = path.join(`${__dirname}/src`, ".wizgen");

export const __resources = path.join(__dirname, "src/resources");