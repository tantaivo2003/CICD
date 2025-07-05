import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize"
import { sequelize } from "../config/db"
export class UserVocabularyModel extends Model<
  InferAttributes<UserVocabularyModel>,
  InferCreationAttributes<UserVocabularyModel>
> {
  declare id: CreationOptional<number>
  declare user_id: number
  declare vocabulary_id: number
  declare added_date: Date
  declare is_learned: CreationOptional<boolean>
  declare learned_at: Date | null
}

UserVocabularyModel.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  vocabulary_id: { type: DataTypes.INTEGER, allowNull: false },
  added_date: { type: DataTypes.DATEONLY, allowNull: false },
  is_learned: { type: DataTypes.BOOLEAN, defaultValue: false },
  learned_at: DataTypes.DATE,
}, {
  sequelize,
  modelName: "UserVocabulary",
  tableName: "user_vocabularies",
  timestamps: false,
})
