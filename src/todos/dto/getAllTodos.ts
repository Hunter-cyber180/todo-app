import { IsOptional } from "class-validator";

// create GetAllTodosDto to validate parameters in getAll todos route
class GetAllTodosDto {
  @IsOptional()
  title: string;

  @IsOptional()
  status: string;

  @IsOptional()
  page: number;

  @IsOptional()
  limit: number;
}

export default GetAllTodosDto;
