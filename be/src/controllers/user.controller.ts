import { Request, Response } from "express"
import { UserModel } from "../models"
import bcrypt from "bcrypt"

export const getUserById = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id)

  if (isNaN(userId)) {
    res.status(400).json({ message: "Invalid ID" })
    return
  }

  const user = await UserModel.findByPk(userId, {
    attributes: ["id", "name", "email", "created_at"],
  })

  if (!user) {
    res.status(404).json({ message: "User not found" })
    return  
  }

  res.json(user)
}


export const updateUserInfo = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id)
  const { name, email } = req.body

  const user = await UserModel.findByPk(userId)
  if (!user) {
    res.status(404).json({ message: "User not found" })
    return 
}

  user.name = name || user.name
  user.email = email || user.email

  await user.save()
  res.json({ message: "User updated", user })
}

export const updateUserPassword = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id)
  const { oldPassword, newPassword } = req.body

  const user = await UserModel.findByPk(userId)
  if (!user) {
    res.status(404).json({ message: "User not found" })
    return
}

  const match = await bcrypt.compare(oldPassword, user.password)
  if (!match) {
    res.status(401).json({ message: "Old password is incorrect" })
    return
  }

  user.password = await bcrypt.hash(newPassword, 10)
  await user.save()

  res.json({ message: "Password updated" })
}