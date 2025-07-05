import { Router } from "express"
import {
  getAllVocabularies,
  getVocabularyById,
  createVocabulary,
  updateVocabulary,
  deleteVocabulary,
} from "../controllers/vocabulary.controller"

const router = Router()
/**
 * @swagger
 * tags:
 *   name: Vocabularies
 *   description: Quản lý kho từ vựng
 */



/**
 * @swagger
 * /api/vocabularies:
 *   get:
 *     summary: Lấy danh sách từ vựng
 *     tags: [Vocabularies]
 *     parameters:
 *       - in: query
 *         name: topic_id
 *         schema:
 *           type: integer
 *         description: Lọc theo topic
 *     responses:
 *       200:
 *         description: Danh sách từ vựng
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vocabulary'
 */
router.get("/", getAllVocabularies)

/**
 * @swagger
 * /api/vocabularies/{id}:
 *   get:
 *     summary: Lấy thông tin 1 từ vựng
 *     tags: [Vocabularies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Từ vựng tìm được
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vocabulary'
 *       404:
 *         description: Không tìm thấy
 */
router.get("/:id", getVocabularyById)

/**
 * @swagger
 * /api/vocabularies:
 *   post:
 *     summary: Thêm từ mới vào kho từ vựng
 *     tags: [Vocabularies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VocabularyInput'
 *     responses:
 *       201:
 *         description: Đã tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vocabulary'
 */
router.post("/", createVocabulary)

/**
 * @swagger
 * /api/vocabularies/{id}:
 *   put:
 *     summary: Cập nhật từ vựng
 *     tags: [Vocabularies]
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
 *             $ref: '#/components/schemas/VocabularyInput'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vocabulary'
 *       404:
 *         description: Không tìm thấy
 */
router.put("/:id", updateVocabulary)

/**
 * @swagger
 * /api/vocabularies/{id}:
 *   delete:
 *     summary: Xoá từ vựng khỏi hệ thống
 *     tags: [Vocabularies]
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
router.delete("/:id", deleteVocabulary)

export default router
