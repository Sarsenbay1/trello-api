import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsString({ message: 'email must be string' })
  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty()
  @IsString({ message: 'email must be string' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsStrongPassword()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}
