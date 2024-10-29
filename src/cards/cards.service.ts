import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { DatabaseService } from 'src/database/database.service';
import { Card } from '@prisma/client';

@Injectable()
export class CardsService {
  constructor(private prisma: DatabaseService) {}

  async createCard(
    createCardDto: CreateCardDto,
    columnId: number,
    userId: number,
  ) {
    const card = await this.prisma.card.create({
      data: {
        name: createCardDto.name,
        user: { connect: { id: userId } },
        column: { connect: { id: columnId } },
      },
    });
    return card;
  }

  async getAllCards(columnId: number): Promise<Card[]> {
    const cards = await this.prisma.card.findMany({ where: { columnId } });
    return cards;
  }

  async getOneCard(id: number): Promise<Card> {
    const card = await this.prisma.card.findUnique({ where: { id } });

    return card;
  }

  async updateCard(id: number, updateCardDto: UpdateCardDto) {
    return this.prisma.card.update({ where: { id }, data: updateCardDto });
  }

  async removeCard(id: number) {
    return this.prisma.card.delete({ where: { id } });
  }
}
