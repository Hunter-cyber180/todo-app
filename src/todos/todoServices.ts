import GetAllTodosDto from "./dto/getAllTodos";
import TodoModel from "../models/Todo";
import Todo from "./dto/todoDto";

export const getAll = async (filters: GetAllTodosDto) => {
  const { limit, page } = filters;
  const todos = await TodoModel.find({})
    .skip((page - 1) * limit)
    .limit(limit);

  return todos;
};

export const getOne = async (id: string) => {
  const todo = await TodoModel.findById(id);
  if (!todo) throw new Error("todo not found!");

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

  if (!updatedTodo) throw new Error("todo not found!");

  return updatedTodo;
};

export const remove = async (id: string) => {
  const deletedTodo = await TodoModel.findByIdAndDelete(id);
  if (!deletedTodo) throw new Error("todo not found!");

  return deletedTodo;
};
