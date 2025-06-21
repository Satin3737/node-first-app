import db from '@/database/db';
import Cart from '@/models/Cart';
import Product from '@/models/Product';
import {CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model} from 'sequelize';

class CartItem extends Model<InferAttributes<CartItem>, InferCreationAttributes<CartItem>> {
    declare id: CreationOptional<number>;
    declare quantity: number;
    declare cartId: ForeignKey<Cart['id']>;
    declare productId: ForeignKey<Product['id']>;
}

CartItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false
        }
    },
    {
        sequelize: db,
        modelName: 'cartItem',
        tableName: 'cartsItems',
        timestamps: false
    }
);

export default CartItem;
