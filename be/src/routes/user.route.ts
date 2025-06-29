// routes/user.route.ts
import { Router } from "express"
import {
  getUserById,
  updateUserInfo,
  updateUserPassword,
} from "../controllers/user.controller"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */


/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */


router.get("/:id", getUserById)

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user info
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 */

router.put("/:id", updateUserInfo)

/**
 * @swagger
 * /api/users/{id}/password:
 *   put:
 *     summary: Update user password
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated
 *       401:
 *         description: Incorrect old password
 *       404:
 *         description: User not found
 */

router.put("/:id/password", updateUserPassword)

export default router
