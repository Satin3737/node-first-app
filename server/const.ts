import path from 'path';

export const PORT = 3000;

export const ROOT_DIR = __dirname;
export const PUBLIC_DIR = 'public';

export const VIEWS_DIR = path.join(ROOT_DIR, 'views');
export const LAYOUTS_DIR = path.join(VIEWS_DIR, 'layouts');
