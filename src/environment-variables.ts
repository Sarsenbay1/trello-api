import { IsInt, IsString } from 'class-validator';

export class EnvironmentVariables {
  @IsInt()
  PORT: number;

  @IsString()
  JWT_SECRET: string;
}
