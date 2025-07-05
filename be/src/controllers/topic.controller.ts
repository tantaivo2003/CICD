import { Request, Response } from "express"
import { TopicModel } from "../models"

export const getAllTopics = async (_: Request, res: Response) => {
  const topics = await TopicModel.findAll()
  res.json(topics)
}

export const getTopicById = async (req: Request, res: Response) => {
  const topic = await TopicModel.findByPk(req.params.id)
  if (!topic) {
    res.status(404).json({ message: "Not found" })
    return;
  }
  res.json(topic)
}

export const createTopic = async (req: Request, res: Response) => {
  const { name, description } = req.body
  if (!name || !description) {
    res.status(400).json({ message: "Missing name or description" });
    return;
}

  const topic = await TopicModel.create({ name, description })
  res.status(201).json(topic)
}

export const updateTopic = async (req: Request, res: Response) => {
  const topic = await TopicModel.findByPk(req.params.id)
  if (!topic) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  topic.name = req.body.name ?? topic.name
  topic.description = req.body.description ?? topic.description
  await topic.save()
  res.json(topic)
}

export const deleteTopic = async (req: Request, res: Response) => {
  const topic = await TopicModel.findByPk(req.params.id)
  if (!topic) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  await topic.destroy()
  res.json({ message: "Deleted successfully" })
}
