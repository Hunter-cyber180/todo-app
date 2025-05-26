import GetAllTodosDto from "./dto/getAllTodos";
import TodoModel from "../models/Todo";
import Todo from "./dto/todoDto";
import TodoError from "../errors/TodoError";

export const getAll = async (filters: GetAllTodosDto) => {
  const { limit, page } = filters;
  const todos = await TodoModel.find({})
    .skip((page - 1) * limit)
    .limit(limit);

  return todos;
};

export const getOne = async (id: string) => {
  const todo = await TodoModel.findById(id);
  if (!todo) throw new TodoError("todo not found!", 404);

  return todo;
};

export const create = async (body: Todo) => {
  const newTodo = new TodoModel(body);
  await newTodo.save();

  return newTodo;
};

export const update = async (id: string, params: Todo) => {
  const updatedTodo = await TodoModel.findByIdAndUpdate(id, params, {
    new: true,
    runValidators: true,
  });

  if (!updatedTodo) throw new TodoError("todo not found!", 404);

  return updatedTodo;
};

export const remove = async (id: string) => {
  const deletedTodo = await TodoModel.findByIdAndDelete(id);
  if (!deletedTodo) throw new TodoError("todo not found!", 404);

  return deletedTodo;
};
