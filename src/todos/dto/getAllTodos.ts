import { IsOptional } from "class-validator";

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
