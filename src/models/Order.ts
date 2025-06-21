import db from '@/database/db';
import Product from '@/models/Product';
import User from '@/models/User';
import {
    BelongsToManyAddAssociationMixin,
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model
} from 'sequelize';

class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
    declare id: CreationOptional<number>;
    declare userId: ForeignKey<User['id']>;
    declare addProduct: BelongsToManyAddAssociationMixin<Product, Product['id']>;
}

Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        }
    },
    {
        sequelize: db,
        modelName: 'order',
        tableName: 'orders',
        timestamps: false
    }
);

export default Order;
