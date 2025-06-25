import db from '@/database/db';
import logger from '@/utils/logger';
import cors from 'cors';
import express from 'express';
import pinoHttp from 'pino-http';
import {PORT, PUBLIC_DIR, VIEWS_DIR} from '@/const';
import adminRouter from '@/routes/admin';
import notFoundRouter from '@/routes/not-found';
import shopRouter from '@/routes/shop';

const app = express();

app.set('title', 'NodeJS');
app.set('view engine', 'ejs');
app.set('views', VIEWS_DIR);

const middlewares = [
    cors(),
    express.json(),
    express.urlencoded({extended: true}),
    express.static(PUBLIC_DIR),
    pinoHttp({logger})
];

const appRoutes = [shopRouter, adminRouter, notFoundRouter];

app.use([...middlewares, ...appRoutes]);

db.admin()
    .ping()
    .then(() => app.listen(PORT, () => logger.info(`Server running on http://localhost:${PORT}`)))
    .catch(error => (logger.error(error, 'Failed to connect to MongoDB'), process.exit(1)));
