import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize"
import { sequelize } from "../config/db"

export class VocabularyModel extends Model<
  InferAttributes<VocabularyModel>,
  InferCreationAttributes<VocabularyModel>
> {
  declare id: CreationOptional<number>
  declare word: string
  declare meaning: string
  declare context: string | null
  declare pronunciation: string | null
  declare topic_id: number
}

VocabularyModel.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  word: { type: DataTypes.STRING, allowNull: false },
  meaning: { type: DataTypes.TEXT, allowNull: false },
  context: DataTypes.TEXT,
  pronunciation: DataTypes.STRING,
  topic_id: { type: DataTypes.INTEGER, allowNull: false },
}, {
  sequelize,
  modelName: "Vocabulary",
  tableName: "vocabularies",
  timestamps: false,
})
