import fs from 'fs/promises';
import path from 'path';
import { directoryName } from '../resources/constants/utils.constant.js';
import { FILE_MANAGEMENT } from '../resources/en/en.resource.js';

export const init = async () => {
    try {
        // Check if directory exists
        try {
            await fs.access(directoryName);
            console.log(`${FILE_MANAGEMENT.DIRECTORY_EXISTS} ${directoryName}`);
        } catch (err) {
            await fs.mkdir(directoryName);
            console.log(`${FILE_MANAGEMENT.DIRECTORY_CREATED} ${directoryName}.`);
        }

        const defaultContents = {
            "settings.json": '{}',
            "entity.definition.json": '{}'
        };

        // Check and create files
        for (const [file, content] of Object.entries(defaultContents)) {
            const filePath = path.join(directoryName, file);
            try {
                await fs.access(filePath);
                console.log(`${FILE_MANAGEMENT.FILE_EXISTS} ${file}`);
            } catch (err) {
                await fs.writeFile(filePath, content);
                console.log(`${FILE_MANAGEMENT.FILE_CREATED} ${file}`);
            }
        }
    } catch (error: any) {
        console.error(`An error occurred: ${error.message}`);
    }
};
