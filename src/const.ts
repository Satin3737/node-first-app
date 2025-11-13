import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

export const SrcDir = path.dirname(__filename);
export const RootDir = path.join(SrcDir, '..');
export const PublicDir = 'public';
export const StorageDir = 'storage';
export const UploadsDir = `${StorageDir}/uploads`;
export const InvoicesDir = `${StorageDir}/invoices`;
export const ViewsDir = path.join(SrcDir, 'views');

export const Port = Number(process.env.PORT) || 3000;
export const BaseUrl = process.env.BASE_URL || 'http://localhost';
export const BaseUrlWithPort = `${BaseUrl}:${Port}`;

export const MaxUploadSize = 5 * 1024 * 1024;
export const ProductsPerPage = 2;

export const SignupEmailTemplate = (name: string) => `
    <h1>
        ${name}, welcome to Our Service!
    </h1>
    <p>
        Thank you for signing up. We're excited to have you on board.
    </p>
`;

export const ResetPasswordEmailTemplate = (link: string) => `
    <h1>
        Your password reset link
    </h1>
    <p>
        Click <a href="${link}">here</a> to reset your password. This link will expire in one hour.
    </p>
`;
