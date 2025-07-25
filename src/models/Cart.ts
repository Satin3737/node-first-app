import db from '@/database/db';
import Product from '@/models/Product';
import User from '@/models/User';
import {
    BelongsToManyAddAssociationMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManySetAssociationsMixin,
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model
} from 'sequelize';

class Cart extends Model<InferAttributes<Cart>, InferCreationAttributes<Cart>> {
    declare id: CreationOptional<number>;
    declare userId: ForeignKey<User['id']>;
    declare getProducts: BelongsToManyGetAssociationsMixin<Product>;
    declare addProduct: BelongsToManyAddAssociationMixin<Product, Product['id']>;
    declare setProducts: BelongsToManySetAssociationsMixin<Product, Product['id']>;
}

Cart.init(
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
        modelName: 'cart',
        tableName: 'carts',
        timestamps: false
    }
);

export default Cart;
