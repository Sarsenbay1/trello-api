import { ApiProperty } from '@nestjs/swagger';
import { ColumnRto } from 'src/columns/rto/column.rto';

export class CreateCardRto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  column: ColumnRto;

  @ApiProperty()
  id: number;
}
