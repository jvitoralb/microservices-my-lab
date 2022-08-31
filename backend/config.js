import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
const frontend = join(__dirname, '..', 'frontend');

export default frontend;