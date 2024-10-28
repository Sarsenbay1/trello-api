import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty({ message: 'name should not be empty' })
  @IsString({ message: 'name must be string' })
  @Length(3, 40, { message: 'name must be from 3 to 40 characters' })
  @ApiProperty()
  name: string;
}
