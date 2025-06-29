import { Request, Response } from "express"
import { UserModel } from "../models"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "secret123"

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  try {
    // Kiểm tra trùng email
    const existingUser = await UserModel.findOne({ where: { email } })
    if (existingUser) {
      res.status(400).json({ message: "Email already registered" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    })

    res.status(201).json({ message: "User created", user: { id: newUser.id, email: newUser.email } })
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err })
  }
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await UserModel.findOne({ where: { email } })
    if (!user) {
      res.status(404).json({ message: "User not found" })
      return 
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    )

    res.json({ token, user: { id: user.id, name: user.name, email: user.email } })
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err })
  }
}
