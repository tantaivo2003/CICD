import { Request, Response } from "express"
import { VocabularyModel, TopicModel } from "../models"

export const getAllVocabularies = async (req: Request, res: Response) => {
  const { topic_id } = req.query

  const where = topic_id ? { topic_id: Number(topic_id) } : {}

  const vocabularies = await VocabularyModel.findAll({
    where,
    include: [{ model: TopicModel, attributes: ["id", "name"] }],
  })

  res.json(vocabularies)
}

export const getVocabularyById = async (req: Request, res: Response) => {
  const vocab = await VocabularyModel.findByPk(req.params.id, {
    include: TopicModel,
  })

  if (!vocab) {
    res.status(404).json({ message: "Not found" })
    return;
  }
  res.json(vocab)
}

export const createVocabulary = async (req: Request, res: Response) => {
  const { word, meaning, context, pronunciation, topic_id } = req.body

  if (!word || !meaning || !topic_id) {
    res.status(400).json({ message: "Missing required fields" })
    return;
  }

  const vocab = await VocabularyModel.create({
    word,
    meaning,
    context,
    pronunciation,
    topic_id,
  })

  res.status(201).json(vocab)
}

export const updateVocabulary = async (req: Request, res: Response) => {
  const vocab = await VocabularyModel.findByPk(req.params.id)
  if (!vocab) {
    res.status(404).json({ message: "Not found" })
    return;
  }

  const { word, meaning, context, pronunciation, topic_id } = req.body

  vocab.word = word ?? vocab.word
  vocab.meaning = meaning ?? vocab.meaning
  vocab.context = context ?? vocab.context
  vocab.pronunciation = pronunciation ?? vocab.pronunciation
  vocab.topic_id = topic_id ?? vocab.topic_id

  await vocab.save()
  res.json(vocab)
}

export const deleteVocabulary = async (req: Request, res: Response) => {
  const vocab = await VocabularyModel.findByPk(req.params.id)
  if (!vocab) {
        res.status(404).json({ message: "Not found" })
    return;
  }

  await vocab.destroy()
  res.json({ message: "Deleted successfully" })
}
