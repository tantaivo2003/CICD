import swaggerJSDoc from "swagger-jsdoc"

export const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo API",
      version: "1.0.0",
      description: "API docs for Todo backend using Node.js + PostgreSQL",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/models/*.ts"], // nơi chứa mô tả API
}

export const swaggerSpec = swaggerJSDoc(swaggerOptions)
