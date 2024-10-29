import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsString({ message: 'content must be string' })
  @ApiProperty()
  @MinLength(8, { message: 'content must be at least 8 characters long' })
  content: string;
}
