import { Router } from "express"
import { getTodos, getTodosByUserId, createTodo, updateTodo, toggleTodoStatus, deleteTodo, getTodoById, searchTodos  } from "../controllers/todo.controller"
import { authenticateToken } from "../middlewares/auth.middleware"
const router = Router()
/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo management
 */

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: List of todos
 */

router.get("/", getTodos)

/**
 * @swagger
 * /api/todos/user/{id}:
 *   get:
 *     summary: Get todos by user ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: List of todos for the user
 */

router.get("/user/:id", getTodosByUserId)

/**
    * @swagger
    * /api/todos:
    *   post:
    *     summary: Create a new todo
    *     tags: [Todos]
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               title:
    *                 type: string
    *               description:
    *                 type: string
    *               user_id:
    *                 type: integer
    *     responses:
    *       201:
    *         description: Todo created successfully
*/
router.post("/", createTodo)

/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Update a todo by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Todo updated
 */

router.put("/:id", updateTodo)

/**
 * @swagger
 * /api/todos/{id}/toggle:
 *   patch:
 *     summary: Toggle completion status of a todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the todo
 *     responses:
 *       200:
 *         description: Todo status toggled
 */


router.patch("/:id/toggle", toggleTodoStatus)

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a todo by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the todo
 *     responses:
 *       200:
 *         description: Todo deleted
 */

router.delete("/:id", deleteTodo)

/**
 * @swagger
 * /api/todos/search:
 *   get:
 *     summary: Search todos by title or description
 *     tags: [Todos]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Keyword to search
 *     responses:
 *       200:
 *         description: List of matching todos
 *       400:
 *         description: Missing query
 */

router.get("/search", searchTodos)

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Get todo by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Todo ID
 *     responses:
 *       200:
 *         description: Todo found
 *       404:
 *         description: Todo not found
 */

router.get("/:id", getTodoById)

export default router
