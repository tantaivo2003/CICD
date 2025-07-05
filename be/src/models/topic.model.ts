import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize"
import { sequelize } from "../config/db"

export class TopicModel extends Model<
  InferAttributes<TopicModel>,
  InferCreationAttributes<TopicModel>
> {
  declare id: CreationOptional<number>
  declare name: string
  declare description: string | null
}

TopicModel.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
}, {
  sequelize,
  modelName: "Topic",
  tableName: "topics",
  timestamps: false,
})
