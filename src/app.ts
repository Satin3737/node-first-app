import db from '@/database/db';
import cors from 'cors';
import express from 'express';
import {PORT, PUBLIC_DIR, VIEWS_DIR} from '@/const';
import adminRouter from '@/routes/admin';
import notFoundRouter from '@/routes/not-found';
import shopRouter from '@/routes/shop';

const app = express();

app.set('title', 'NodeJS');
app.set('view engine', 'ejs');
app.set('views', VIEWS_DIR);

const middlewares = [cors(), express.json(), express.urlencoded({extended: true}), express.static(PUBLIC_DIR)];
const appRoutes = [shopRouter, adminRouter, notFoundRouter];

app.use([...middlewares, ...appRoutes]);

db.admin()
    .ping()
    .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
    .catch(error => (console.error('Failed to connect to MongoDB:', error), process.exit(1)));
