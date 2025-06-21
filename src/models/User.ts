import db from '@/database/db';
import Cart from '@/models/Cart';
import Order from '@/models/Order';
import Product from '@/models/Product';
import {
    CreationOptional,
    DataTypes,
    HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin,
    HasOneGetAssociationMixin,
    InferAttributes,
    InferCreationAttributes,
    Model
} from 'sequelize';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare email: string;
    declare createProduct: HasManyCreateAssociationMixin<Product>;
    declare getProducts: HasManyGetAssociationsMixin<Product>;
    declare createCart: HasOneGetAssociationMixin<Cart>;
    declare getCart: HasOneGetAssociationMixin<Cart>;
    declare createOrder: HasManyCreateAssociationMixin<Order>;
    declare getOrders: HasManyGetAssociationsMixin<Order>;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        sequelize: db,
        modelName: 'user',
        tableName: 'users',
        timestamps: false
    }
);

export default User;
