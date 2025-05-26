import { Router, Request, Response } from "express";

// * --- DTO ---
import Todo from "./dto/todoDto";
import GetAllTodosDto from "./dto/getAllTodos";
import CreateTodoDto from "./dto/todoCreateDto";

// * --- services ---
import { create, getAll, getOne, remove, update } from "./todoServices";

// * --- middlewares ---
import validateMiddleware from "../middlewares/validate.middleware";

const router = Router();

// get all todos route
router.get("/", async (req: Request, res: Response): Promise<void> => {
  // To get todos that have these filters
  const filters: GetAllTodosDto = {
    title: req.query.title as string,
    status: req.query.status as string,
    page: req.query.page ? Number(req.query.page) : 1,
    limit: req.query.limit ? Number(req.query.limit) : 10,
  };

  // get todos from todoServices
  const todos = await getAll(filters);

  res.status(200).json({
    message: "Get todos was successfully!",
    data: todos,
    success: true,
  });
});

// get one todo route
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  // get todo from todoServices
  const todo = await getOne(id);

  res.status(200).json({
    message: "Get todo was successfully!",
    data: todo,
    success: true,
  });
});

// create todo route
router.post(
  "/",
  validateMiddleware(CreateTodoDto), // validation body
  async (req: Request, res: Response): Promise<void> => {
    const body: Todo = req.body;
    // create todo from todoServices
    const newTodo = await create(body);

    res.status(201).json({
      message: "Create todo was successfully!",
      data: newTodo,
      success: true,
    });
  }
);

// update todo route
router.put(
  "/:id",
  validateMiddleware(CreateTodoDto), // validation body
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const body: Todo = req.body;

    // update todo from todoServices
    const updatedTodo = await update(id, body);

    res.status(200).json({
      message: "Update todo was successfully!",
      data: updatedTodo,
      success: true,
    });
  }
);

// delete todo route
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  // delete todo from todoServices
  const deletedTodo = await remove(id);

  res.status(200).json({
    message: "Delete todo was successfully!",
    data: deletedTodo,
    success: true,
  });
});

export default router;
