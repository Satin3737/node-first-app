import cors from 'cors';
import express from 'express';
import pinoHttp from 'pino-http';
import initializeMongoServer from '@/database/db';
import {Port, PublicDir, ViewsDir} from '@/const';
import {logger} from '@/utils';
import {adminRouter, notFoundRouter, shopRouter} from '@/routes';
import {dummyUser} from '@/middlewares';

const app = express();

app.set('title', 'NodeJS');
app.set('view engine', 'ejs');
app.set('views', ViewsDir);

const middlewares = [
    cors(),
    express.json(),
    express.urlencoded({extended: true}),
    express.static(PublicDir),
    pinoHttp({logger, autoLogging: false}),
    dummyUser
];

const appRoutes = [shopRouter, adminRouter, notFoundRouter];

app.use([...middlewares, ...appRoutes]);

initializeMongoServer()
    .then(() => {
        app.listen(Port, () => logger.info(`Server running on http://localhost:${Port}`));
    })
    .catch(error => {
        logger.error(error, 'Failed to connect to MongoDB');
        process.exit(1);
    });
