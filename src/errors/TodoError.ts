import clientError from "./errorInterface";

class TodoError extends Error implements clientError {
  status: number;
  message: string;

  constructor(message: string, status: number = 500) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export default TodoError;
