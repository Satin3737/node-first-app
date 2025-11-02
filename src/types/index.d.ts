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
