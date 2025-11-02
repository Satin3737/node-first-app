import MongoStore from 'connect-mongo';
import cors from 'cors';
import express from 'express';
import expressSession from 'express-session';
import pinoHttp from 'pino-http';
import initializeMongoServer, {mongoUrl} from '@/database/db';
import {Port, PublicDir, ViewsDir} from '@/const';
import {logger} from '@/utils';
import {adminRouter, authRouter, notFoundRouter, shopRouter} from '@/routes';
import {currentUser, locals, protectedRoutes} from '@/middlewares';

const app = express();

app.set('title', 'NodeJS');
app.set('view engine', 'ejs');
app.set('views', ViewsDir);

const middlewares = [
    cors(),
    express.json(),
    express.urlencoded({extended: true}),
    express.static(PublicDir),
    expressSession({
        secret: 'secret-key',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({mongoUrl})
    }),
    pinoHttp({logger, autoLogging: false}),
    protectedRoutes,
    currentUser,
    locals
];

const appRoutes = [authRouter, shopRouter, adminRouter, notFoundRouter];

app.use([...middlewares, ...appRoutes]);

try {
    await initializeMongoServer();
    app.listen(Port, () => logger.info(`Server running on http://localhost:${Port}`));
} catch (error) {
    logger.error(error, 'Failed to connect to MongoDB');
    process.exit(1);
}
