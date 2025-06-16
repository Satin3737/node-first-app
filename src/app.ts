import db from '@/database/db';
import express from 'express';
import {PORT, PUBLIC_DIR, VIEWS_DIR} from '@/const';
import adminRouter from '@/routes/admin';
import notFoundRouter from '@/routes/not-found';
import shopRouter from '@/routes/shop';

const app = express();

app.set('title', 'NodeJS');
app.set('view engine', 'ejs');
app.set('views', VIEWS_DIR);

try {
    db.execute('SELECT * FROM products').then(result => console.log(result));
} catch (error) {
    console.log(error);
}

const middlewares = [express.urlencoded({extended: true}), express.static(PUBLIC_DIR)];
const appRoutes = [shopRouter, adminRouter, notFoundRouter];

app.use([...middlewares, ...appRoutes]);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
