import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

// * --- enums ---
import { TodoStatus } from "../enums/todo-status.enum";

// create CreateTodoDto to validate new todo fileds
class CreateTodoDto {
  @IsNotEmpty({ message: "Title cannot be empty" })
  @IsString({ message: "Title type must be a string." })
  @MinLength(3, { message: "Title is too short" })
  @MaxLength(50, { message: "Title is too long" })
  title: string;

  @IsOptional()
  @IsEnum(TodoStatus)
  status: TodoStatus;
}

export default CreateTodoDto;
