import { Router } from "express"
import {
  getUserVocabularyList,
  getUserVocabularyByDate,
  addWordToUser,
  markWordAsLearned,
  deleteUserVocabulary,
} from "../controllers/user-vocabulary.controller"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: UserVocabularies
 *   description: API quản lý từ vựng của user
 */

/**
 * @swagger
 * /api/user-vocabularies/{user_id}:
 *   get:
 *     summary: Lấy danh sách tất cả từ user đã thêm
 *     tags: [UserVocabularies]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Danh sách từ vựng
 */
router.get("/:user_id", getUserVocabularyList)

/**
 * @swagger
 * /api/user-vocabularies/{user_id}/by-date/{date}:
 *   get:
 *     summary: Lấy danh sách từ vựng theo ngày cụ thể
 *     tags: [UserVocabularies]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         example: 2025-07-06
 *     responses:
 *       200:
 *         description: Danh sách từ vựng của user theo ngày
 */
router.get("/:user_id/by-date/:date", getUserVocabularyByDate)

/**
 * @swagger
 * /api/user-vocabularies:
 *   post:
 *     summary: Thêm từ vựng vào danh sách học của user
 *     tags: [UserVocabularies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - vocabulary_id
 *               - added_date
 *             properties:
 *               user_id:
 *                 type: integer
 *               vocabulary_id:
 *                 type: integer
 *               added_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Đã thêm thành công
 *       409:
 *         description: Từ vựng đã tồn tại trong danh sách
 */
router.post("/", addWordToUser)

/**
 * @swagger
 * /api/user-vocabularies/{id}/mark-learned:
 *   put:
 *     summary: Đánh dấu đã học từ vựng
 *     tags: [UserVocabularies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Đánh dấu thành công
 *       404:
 *         description: Không tìm thấy bản ghi
 */
router.put("/:id/mark-learned", markWordAsLearned)

/**
 * @swagger
 * /api/user-vocabularies/{id}:
 *   delete:
 *     summary: Xoá từ khỏi danh sách học của user
 *     tags: [UserVocabularies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Đã xoá thành công
 *       404:
 *         description: Không tìm thấy bản ghi
 */
router.delete("/:id", deleteUserVocabulary)



export default router
