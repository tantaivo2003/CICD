import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize'
import { sequelize } from '../config/db'

export class UserModel extends Model<
  InferAttributes<UserModel>,
  InferCreationAttributes<UserModel>
> {
  declare id: CreationOptional<number>
  declare name: string
  declare email: string
  declare password: string
  declare created_at: CreationOptional<Date>
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: DataTypes.STRING,
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
  }
)
