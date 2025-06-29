import express from "express"
import dotenv from "dotenv"
import todoRoutes from "./routes/todo.route"
import authRoutes from "./routes/auth.route"
import userRoutes from "./routes/user.route"

import swaggerUi from "swagger-ui-express"
import { swaggerSpec } from "./docs/swagger"
import cors from "cors"

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors()) 

// ✅ Route Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// ✅ Routes API
app.use("/api/todos", todoRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)


export default app
