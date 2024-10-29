import { ApiProperty } from '@nestjs/swagger';
import { CardRto } from 'src/cards/rto/card.rto';

export class CreateCommentRto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  card: CardRto;

  @ApiProperty()
  id: number;
}
