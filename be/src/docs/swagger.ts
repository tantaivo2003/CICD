import swaggerJSDoc from "swagger-jsdoc"

export const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo API",
      version: "1.0.0",
      description: "API docs for Todo backend using Node.js + PostgreSQL",
    },
    components: {
      schemas: {
        Topic: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
          },
        },
        TopicInput: {
          type: "object",
          required: ["name"],
          properties: {
            name: { type: "string", example: "Fruits" },
            description: { type: "string", example: "Chủ đề về trái cây" },
          },
        },
        Vocabulary: {
          type: "object",
          properties: {
            id: { type: "integer" },
            word: { type: "string" },
            meaning: { type: "string" },
            context: { type: "string" },
            pronunciation: { type: "string" },
            topic_id: { type: "integer" },
          },
        },
        VocabularyInput: {
          type: "object",
          required: ["word", "meaning", "topic_id"],
          properties: {
            word: { type: "string", example: "apple" },
            meaning: { type: "string", example: "quả táo" },
            context: { type: "string", example: "He ate an apple." },
            pronunciation: { type: "string", example: "/ˈæp.əl/" },
            topic_id: { type: "integer", example: 1 },
          },
        },
      },
    }
    ,
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/models/*.ts"], // nơi chứa mô tả API
}

export const swaggerSpec = swaggerJSDoc(swaggerOptions)
