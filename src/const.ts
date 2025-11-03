import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

export const RootDir = path.dirname(__filename);
export const PublicDir = 'public';
export const ViewsDir = path.join(RootDir, 'views');

export const Port = 3000;

export const SignupEmailTemplate = (name: string) => `
    <h1>
        ${name}, welcome to Our Service!
    </h1>
    <p>
        Thank you for signing up. We're excited to have you on board.
    </p>
`;
