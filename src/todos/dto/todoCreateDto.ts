import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

class CreateTodoDto {
  @IsNotEmpty({ message: "Title cannot be empty" })
  @IsString({ message: "Title type must be a string." })
  @MinLength(3, { message: "Title is too short" })
  @MaxLength(50, { message: "Title is too long" })
  title: string;

  
}

export default CreateTodoDto;
