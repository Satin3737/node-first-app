import db from '@/database/db';
import Order from '@/models/Order';
import Product from '@/models/Product';
import {CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model} from 'sequelize';

class OrderItem extends Model<InferAttributes<OrderItem>, InferCreationAttributes<OrderItem>> {
    declare id: CreationOptional<number>;
    declare quantity: number;
    declare orderId: ForeignKey<Order['id']>;
    declare productId: ForeignKey<Product['id']>;
}

OrderItem.init(
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
        modelName: 'orderItem',
        tableName: 'orderItems',
        timestamps: false
    }
);

export default OrderItem;
