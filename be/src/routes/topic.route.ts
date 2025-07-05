import { Router } from "express"
import {
  getAllTopics,
  getTopicById,
  createTopic,
  updateTopic,
  deleteTopic,
} from "../controllers/topic.controller"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Topics
 *   description: Quản lý chủ đề từ vựng
 */

/**
 * @swagger
 * /api/topics:
 *   get:
 *     summary: Lấy danh sách tất cả chủ đề
 *     tags: [Topics]
 *     responses:
 *       200:
 *         description: Danh sách chủ đề
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Topic'
 */
router.get("/", getAllTopics)

/**
 * @swagger
 * /api/topics/{id}:
 *   get:
 *     summary: Lấy thông tin 1 chủ đề
 *     tags: [Topics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Thông tin chủ đề
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Topic'
 *       404:
 *         description: Không tìm thấy
 */
router.get("/:id", getTopicById)

/**
 * @swagger
 * /api/topics:
 *   post:
 *     summary: Tạo chủ đề mới
 *     tags: [Topics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TopicInput'
 *     responses:
 *       201:
 *         description: Đã tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Topic'
 */
router.post("/", createTopic)

/**
 * @swagger
 * /api/topics/{id}:
 *   put:
 *     summary: Cập nhật tên chủ đề
 *     tags: [Topics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TopicInput'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy
 */
router.put("/:id", updateTopic)

/**
 * @swagger
 * /api/topics/{id}:
 *   delete:
 *     summary: Xoá chủ đề
 *     tags: [Topics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Xoá thành công
 *       404:
 *         description: Không tìm thấy
 */
router.delete("/:id", deleteTopic)

export default router
