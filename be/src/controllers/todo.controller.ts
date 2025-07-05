import { Request, Response } from "express"
import { TodoModel } from "../models"
import { Op } from "sequelize"

export const getTodos = async (req: Request, res: Response) => {
  const todos = await TodoModel.findAll()
  res.json(todos)
}

export const getTodosByUserId = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id)

  const todos = await TodoModel.findAll({
    where: { user_id: userId },
  })

  res.json(todos)
}

export const getTodoById = async (req: Request, res: Response) => {
  const todo = await TodoModel.findByPk(req.params.id)
  if (!todo) {
    res.status(404).json({ message: "Todo not found" })
    return
  }
  res.json(todo)
}

export const searchTodos = async (req: Request, res: Response) => {
  const { q } = req.query
  if (!q || typeof q !== "string") {
    res.status(400).json({ message: "Missing search query" })
    return
  }

  const todos = await TodoModel.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.iLike]: `%${q}%` } },
        { description: { [Op.iLike]: `%${q}%` } },
      ],
    },
  })

  res.json(todos)
}

export const createTodo = async (req: Request, res: Response) => {
  const { title, description, user_id, start_time, end_time } = req.body;

  if (!title || !user_id) {
    res.status(400).json({ message: "Title and user_id are required" });
    return;
  }

  try {
    const todo = await TodoModel.create({
      title,
      description,
      user_id,
      start_time: start_time ? new Date(start_time) : null,
      end_time: end_time ? new Date(end_time) : null,
    });

    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};


export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, start_time, end_time } = req.body;

  try {
    const todo = await TodoModel.findByPk(id);
    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    todo.title = title ?? todo.title;
    todo.description = description ?? todo.description;
    todo.start_time = start_time ? new Date(start_time) : todo.start_time;
    todo.end_time = end_time ? new Date(end_time) : todo.end_time;

    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};


export const toggleTodoStatus = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const todo = await TodoModel.findByPk(id);
    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    todo.completed = !todo.completed;
    todo.end_time = todo.completed ? new Date() : null;

    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const todo = await TodoModel.findByPk(id)
    if (!todo) {
      res.status(404).json({ message: "Todo not found" })
      return
    }

    await todo.destroy()
    res.json({ message: "Todo deleted successfully" })
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err })
  }
}

