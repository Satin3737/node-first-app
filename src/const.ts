import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

export const RootDir = path.dirname(__filename);
export const PublicDir = 'public';
export const ViewsDir = path.join(RootDir, 'views');

export const Port = 3000;
