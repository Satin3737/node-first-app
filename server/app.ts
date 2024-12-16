import express from 'express';
import {PORT, PUBLIC_DIR} from '@/const';
import notFoundRouter from '@/routes/404';
import productRouter from '@/routes/product';
import shopRouter from '@/routes/shop';

const app = express();

const middlewares = [express.urlencoded({extended: true}), express.static(PUBLIC_DIR)];
const appRoutes = [shopRouter, productRouter, notFoundRouter];

app.use([...middlewares, ...appRoutes]);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
