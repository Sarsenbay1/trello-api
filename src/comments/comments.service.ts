import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: DatabaseService) {}

  async createComment(
    createCommentDto: CreateCommentDto,
    cardId: number,
    userId: number,
  ) {
    const comment = await this.prisma.comment.create({
      data: {
        content: createCommentDto.content,
        user: { connect: { id: userId } },
        card: { connect: { id: cardId } },
      },
    });
    return comment;
  }

  async getAllComments(cardId: number) {
    return await this.prisma.comment.findMany({ where: { cardId } });
  }

  async getOneComment(id: number) {
    return await this.prisma.comment.findUnique({ where: { id } });
  }

  async updateComment(id: number, updateCommentDto: UpdateCommentDto) {
    return await this.prisma.comment.update({
      where: { id },
      data: updateCommentDto,
    });
  }

  async removeComment(id: number) {
    return await this.prisma.comment.delete({ where: { id } });
  }
}
