import db from '@/database/db';
import dummyUser from '@/middlewares/dummy';
import Cart from '@/models/Cart';
import CartItem from '@/models/CartItem';
import Order from '@/models/Order';
import OrderItem from '@/models/OrderItem';
import Product from '@/models/Product';
import User from '@/models/User';
import express from 'express';
import {PORT, PUBLIC_DIR, VIEWS_DIR} from '@/const';
import adminRouter from '@/routes/admin';
import notFoundRouter from '@/routes/not-found';
import shopRouter from '@/routes/shop';

const app = express();

app.set('title', 'NodeJS');
app.set('view engine', 'ejs');
app.set('views', VIEWS_DIR);

const middlewares = [express.urlencoded({extended: true}), express.static(PUBLIC_DIR), dummyUser];
const appRoutes = [shopRouter, adminRouter, notFoundRouter];

app.use([...middlewares, ...appRoutes]);

User.hasMany(Product);
User.hasOne(Cart);
User.hasMany(Order);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
Product.belongsToMany(Cart, {through: CartItem});
Product.belongsToMany(Order, {through: OrderItem});

Cart.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
Cart.belongsToMany(Product, {through: CartItem});

Order.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
Order.belongsToMany(Product, {through: OrderItem});

db.sync()
    .then(async () => {
        console.log('Database connection established successfully.');
        // Ensure a dummy user exists for testing purposes
        const dummy = await User.findByPk(1);
        if (!dummy) await User.create({name: 'Dummy User', email: 'dummy@dummy.com'});

        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch(err => {
        console.error('Database connection failed:', err);
        process.exit(1);
    });
