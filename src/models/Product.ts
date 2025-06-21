import db from '@/database/db';
import CartItem from '@/models/CartItem';
import OrderItem from '@/models/OrderItem';
import User from '@/models/User';
import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute
} from 'sequelize';

class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare imageUrl: string;
    declare description: string;
    declare price: number;
    declare userId: ForeignKey<User['id']>;
    declare cartItem: NonAttribute<CartItem>;
    declare orderItem: NonAttribute<OrderItem>;
}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    },
    {
        sequelize: db,
        modelName: 'product',
        tableName: 'products',
        timestamps: false
    }
);

export default Product;
