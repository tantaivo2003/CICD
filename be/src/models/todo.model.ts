import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize"
import { sequelize } from "../config/db"

export class TodoModel extends Model<
  InferAttributes<TodoModel>,
  InferCreationAttributes<TodoModel>
> {
  declare id: CreationOptional<number>
  declare title: string
  declare description: string | null
  declare completed: CreationOptional<boolean>
  declare date: Date | null
  declare user_id: number
}

TodoModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    date: DataTypes.DATE,
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Todo",
    tableName: "todos",
    timestamps: false,
  }
)
