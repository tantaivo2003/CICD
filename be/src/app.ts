import express from "express"
import dotenv from "dotenv"
import todoRoutes from "./routes/todo.route"
import authRoutes from "./routes/auth.route"
import userRoutes from "./routes/user.route"
import vocalbularyRoutes from "./routes/vocabulary.route"
import topicRoutes from "./routes/topic.route"
import userVocabularyRoutes from "./routes/user-vocabulary.route"

import swaggerUi from "swagger-ui-express"
import { swaggerSpec } from "./docs/swagger"
import cors from "cors"

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors()) 

// ✅ Route Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// ✅ Route API
app.use("/api/todos", todoRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/topics", topicRoutes)
app.use("/api/vocabularies", vocalbularyRoutes)
app.use("/api/user-vocabularies", userVocabularyRoutes)

export default app
