import app from "./app"
import { sequelize } from "./config/db"

const PORT = process.env.PORT || 4000

async function startServer() {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error("❌ DB connection failed:", err)
  }
}

startServer()
