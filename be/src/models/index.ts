import { UserModel } from "./user.model"
import { TodoModel } from "./todo.model"

UserModel.hasMany(TodoModel, { foreignKey: "user_id" })
TodoModel.belongsTo(UserModel, { foreignKey: "user_id" })

export { UserModel, TodoModel }
