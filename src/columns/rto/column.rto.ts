import { ApiProperty } from '@nestjs/swagger';

export class ColumnRto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;
}
