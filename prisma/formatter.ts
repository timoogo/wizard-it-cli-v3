import { execSync } from 'child_process';

export const formatter = async () => {
    execSync('npx prisma format --schema=./prisma/schema.prisma');
}