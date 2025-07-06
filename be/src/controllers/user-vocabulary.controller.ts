import { Request, Response } from "express"
import { UserVocabularyModel, VocabularyModel } from "../models"

// Lấy danh sách từ vựng user đang học (có join từ)
export const getUserVocabularyList = async (req: Request, res: Response) => {
  const user_id = parseInt(req.params.user_id)

  const list = await UserVocabularyModel.findAll({
    where: { user_id },
    include: [VocabularyModel],
    order: [["added_date", "DESC"]],
  })

  res.json(list)
}

export const getUserVocabularyByDate = async (req: Request, res: Response) => {
  const user_id = parseInt(req.params.user_id)
  const date = req.params.date // ví dụ: '2025-07-06'

  if (!user_id || !date) {
    res.status(400).json({ message: "Missing user_id or date" });
    return;
  }

  try {
    const list = await UserVocabularyModel.findAll({
      where: {
        user_id,
        added_date: date,
      },
      include: [VocabularyModel],
    })

    res.json(list)
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err })
  }
}


// Thêm từ vào danh sách học
export const addWordToUser = async (req: Request, res: Response) => {
  const { user_id, vocabulary_id, added_date } = req.body

  if (!user_id || !vocabulary_id || !added_date) {
    res.status(400).json({ message: "Missing fields" });
    return;
  }

  // 1. Kiểm tra từ vựng có tồn tại không
  const vocab = await VocabularyModel.findByPk(vocabulary_id)
  if (!vocab) {
    res.status(404).json({ message: "Vocabulary not found" });
    return;
  }

  // 2. Kiểm tra user đã thêm từ này chưa
  const already = await UserVocabularyModel.findOne({
    where: { user_id, vocabulary_id },
  })
  if (already) {
    res.status(409).json({ message: "Word already in list" });
    return;
  }

  // 3. Thêm vào danh sách học
  const entry = await UserVocabularyModel.create({
    user_id,
    vocabulary_id,
    added_date,
    is_learned: false, // nên set rõ
  })

  res.status(201).json(entry)
}

// Đánh dấu đã học
export const markWordAsLearned = async (req: Request, res: Response) => {
  const { id } = req.params

  const record = await UserVocabularyModel.findByPk(id)
  if (!record) {
    res.status(404).json({ message: "Not found" })
    return
  }

  record.is_learned = true
  record.learned_at = new Date()
  await record.save()

  res.json(record)
}

// Xoá từ khỏi danh sách
export const deleteUserVocabulary = async (req: Request, res: Response) => {
  const { id } = req.params

  const record = await UserVocabularyModel.findByPk(id)
  if (!record) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  await record.destroy()
  res.json({ message: "Deleted" })
}
