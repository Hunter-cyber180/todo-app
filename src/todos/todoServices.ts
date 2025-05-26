// * --- Application Modules ---
import TodoError from "../errors/TodoError";

// * --- DTO ---
import GetAllTodosDto from "./dto/getAllTodos";
import Todo from "./dto/todoDto";

// * --- models ---
import TodoModel from "../models/Todo";

// get all todos
export const getAll = async (filters: GetAllTodosDto) => {
  const { limit, page } = filters; // get limit and page for pagination

  // get todos from Todo model
  const todos = await TodoModel.find({})
    .skip((page - 1) * limit)
    .limit(limit);

  return todos;
};

// get one todo
export const getOne = async (id: string) => {
  // get todo by id from Todo model
  const todo = await TodoModel.findById(id);
  if (!todo) throw new TodoError("todo not found!", 404);

  return todo;
};

// create todo
export const create = async (body: Todo) => {
  // create todo and save
  const newTodo = new TodoModel(body);
  await newTodo.save();

  return newTodo;
};

// update todo
export const update = async (id: string, params: Todo) => {
  // get todo by id and update todo
  const updatedTodo = await TodoModel.findByIdAndUpdate(id, params, {
    new: true,
    runValidators: true,
  });

  if (!updatedTodo) throw new TodoError("todo not found!", 404);

  return updatedTodo;
};

// delete todo
export const remove = async (id: string) => {
  // remove todo
  const deletedTodo = await TodoModel.findByIdAndDelete(id);
  if (!deletedTodo) throw new TodoError("todo not found!", 404);

  return deletedTodo;
};
