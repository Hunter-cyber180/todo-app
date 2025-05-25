import { Router, Request, Response } from "express";
import GetAllTodosDto from "./dto/getAllTodos";
import Todo from "./dto/todoDto";
import { create, getAll, getOne, remove, update } from "./todoServices";
const router = Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  const filters: GetAllTodosDto = {
    title: req.query.title as string,
    status: req.query.status as string,
    page: req.query.page ? Number(req.query.page) : 1,
    limit: req.query.limit ? Number(req.query.limit) : 10,
  };

  const todos = await getAll(filters);

  res.status(200).json({
    message: "Get todos was successfully!",
    data: todos,
    success: true,
  });
});

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const todo = await getOne(id);

  res.status(200).json({
    message: "Get todo was successfully!",
    data: todo,
    success: true,
  });
});

router.post("/", async (req: Request, res: Response): Promise<void> => {
  const body: Todo = req.body;
  const newTodo = await create(body);

  res.status(201).json({
    message: "Create todo was successfully!",
    data: newTodo,
    success: true,
  });
});

router.put("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const body: Todo = req.body;

  const updatedTodo = await update(id, body);
  res.status(200).json({
    message: "Update todo was successfully!",
    data: updatedTodo,
    success: true,
  });
});

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const deletedTodo = await remove(id);

  res.status(200).json({
    message: "Delete todo was successfully!",
    data: deletedTodo,
    success: true,
  });
});

export default router;
