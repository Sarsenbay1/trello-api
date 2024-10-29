import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateColumnDto {
  @IsString({ message: 'title must be string' })
  @IsNotEmpty()
  @Length(3, 40, { message: 'title must be from 3 to 40 characters' })
  @ApiProperty()
  title: string;
}
