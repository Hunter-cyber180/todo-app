// interfaces
import clientError from "./errorInterface";

// define class TodoError To display a customized error to the user
class TodoError extends Error implements clientError {
  status: number;
  message: string;

  constructor(message: string, status: number = 500) {
    super(message);

    // Define message and status properties to display 
    // the error status code and error message to the user.
    this.status = status;
    this.message = message;
  }
}

export default TodoError;
