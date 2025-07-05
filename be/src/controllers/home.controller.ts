import { Request, Response } from "express";

export const getHome = (req: Request, res: Response) => {
  console.log("GET /home called");
  res.send("<h1 style='color: green;'>Trang chủ hoạt động</h1>");
};
