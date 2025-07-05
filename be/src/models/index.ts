// Import Sequelize instance
import { sequelize } from "../config/db"

// Import all models
import { UserModel } from "./user.model"
import { TodoModel } from "./todo.model"
import { TopicModel } from "./topic.model"
import { VocabularyModel } from "./vocabulary.model"
import { UserVocabularyModel } from "./user-vocabulary.model"

// 1️⃣ Quan hệ: User - Todo
// Mỗi user có thể có nhiều công việc todo
UserModel.hasMany(TodoModel, { foreignKey: "user_id" })
TodoModel.belongsTo(UserModel, { foreignKey: "user_id" })

// 2️⃣ Quan hệ: Topic - Vocabulary
// Mỗi chủ đề chứa nhiều từ vựng
TopicModel.hasMany(VocabularyModel, { foreignKey: "topic_id" })
VocabularyModel.belongsTo(TopicModel, { foreignKey: "topic_id" })

// 3️⃣ Quan hệ N-N: User - Vocabulary thông qua UserVocabulary
// Mỗi user có thể học nhiều từ
// Mỗi từ có thể được học bởi nhiều user
UserModel.belongsToMany(VocabularyModel, {
  through: UserVocabularyModel,
  foreignKey: "user_id",
  otherKey: "vocabulary_id",
})

VocabularyModel.belongsToMany(UserModel, {
  through: UserVocabularyModel,
  foreignKey: "vocabulary_id",
  otherKey: "user_id",
})

// 4️⃣ Quan hệ: User - UserVocabulary (1-N)
// Một user có nhiều bản ghi học từ (trong user_vocabularies)
UserModel.hasMany(UserVocabularyModel, { foreignKey: "user_id" })
UserVocabularyModel.belongsTo(UserModel, { foreignKey: "user_id" })

// 5️⃣ Quan hệ: Vocabulary - UserVocabulary (1-N)
// Một từ vựng có thể được nhiều người học (với lịch sử riêng)
VocabularyModel.hasMany(UserVocabularyModel, { foreignKey: "vocabulary_id" })
UserVocabularyModel.belongsTo(VocabularyModel, { foreignKey: "vocabulary_id" })

// Export tất cả models
export {
  sequelize,
  UserModel,
  TodoModel,
  TopicModel,
  VocabularyModel,
  UserVocabularyModel,
}
