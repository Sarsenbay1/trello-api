import { ApiProperty } from '@nestjs/swagger';
import { UserRto } from 'src/users/rto/user.rto';

export class CreateColumnRto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  user: UserRto;

  @ApiProperty()
  id: string;
}
