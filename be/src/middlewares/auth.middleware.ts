// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "secret123"

interface JwtPayload {
  id: number
  email: string
  iat: number
  exp: number
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    res.status(401).json({ message: "Access denied: No token provided" })
    return
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
    req.user = decoded // gắn thông tin user vào request
    next()
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" })
    return
  }
}
