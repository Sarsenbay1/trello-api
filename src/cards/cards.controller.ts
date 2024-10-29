import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { OwnershipGuard } from 'src/guards/ownership.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiOkResponse } from '@nestjs/swagger';
import { CardRto } from './rto/card.rto';
import { DeleteCardRto } from './rto/delete-card.rto';
import { CreateCardRto } from './rto/create-card.rto';

@Controller('users/:userId/columns/:columnId/cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @ApiOkResponse({
    description: 'The create card',
    type: CreateCardRto,
    isArray: false,
  })
  @UseGuards(AuthGuard, OwnershipGuard)
  @Post()
  createCard(
    @Body() createCardDto: CreateCardDto,
    @Param('columnId', ParseIntPipe) columnId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.cardsService.createCard(createCardDto, columnId, userId);
  }

  @ApiOkResponse({
    description: 'The getting all cards',
    type: CardRto,
    isArray: true,
  })
  @UseGuards(AuthGuard)
  @Get()
  getAllCards(@Param('columnId', ParseIntPipe) columnId: number) {
    return this.cardsService.getAllCards(columnId);
  }

  @ApiOkResponse({
    description: 'The getting one card',
    type: CardRto,
    isArray: false,
  })
  @UseGuards(AuthGuard)
  @Get(':cardId')
  getOneCard(@Param('cardId', ParseIntPipe) id: number) {
    return this.cardsService.getOneCard(id);
  }

  @ApiOkResponse({
    description: 'The update card',
    type: CardRto,
    isArray: false,
  })
  @UseGuards(AuthGuard, OwnershipGuard)
  @Patch(':cardId')
  updateCard(
    @Param('cardId', ParseIntPipe) id: number,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    return this.cardsService.updateCard(id, updateCardDto);
  }

  @ApiOkResponse({
    description: 'The delete card',
    type: DeleteCardRto,
    isArray: false,
  })
  @UseGuards(AuthGuard, OwnershipGuard)
  @Delete(':cardId')
  removeCard(@Param('cardId', ParseIntPipe) id: number) {
    return this.cardsService.removeCard(id);
  }
}
