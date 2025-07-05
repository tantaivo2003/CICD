import { Router } from "express";
import { getHome } from "../controllers/home.controller";

const router = Router();

/**
 * @swagger
 * /home:
 *   get:
 *     summary: Trang chủ
 *     description: Trả về thông báo "Trang chủ hoạt động"
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: "<h1>Trang chủ hoạt động</h1>"
 */
router.get("/", getHome); // 👈 đúng với app.use("/home", ...)
export default router;
