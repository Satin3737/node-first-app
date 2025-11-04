import type {IUser} from '@/models';

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

declare module 'express-session' {
    interface SessionData {
        userId?: IUser['_id'];
    }
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BASE_URL: string;
            PORT: number;
            DB_HOST: string;
            DB_PORT: number;
            MONGO_INITDB_DATABASE: string;
            MONGO_INITDB_ROOT_USERNAME: string;
            MONGO_INITDB_ROOT_PASSWORD: string;
            MAILGUN_API_KEY: string;
            MAILGUN_DOMAIN: string;
        }
    }
}
