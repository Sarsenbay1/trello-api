import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { DatabaseService } from 'src/database/database.service';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(
    private readonly prisma: DatabaseService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = request.headers.authorization.replace('Bearer ', '');

    const decode = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });
    const userIdFromJwt = decode.sub;
    const userId = parseInt(request.params.userId, 10);

    const columnId = request.params.columnId
      ? parseInt(request.params.columnId, 10)
      : null;
    const cardId = request.params.cardId
      ? parseInt(request.params.cardId, 10)
      : null;
    const commentId = request.params.commentId
      ? parseInt(request.params.commentId, 10)
      : null;

    if (!userId || userId != userIdFromJwt) {
      throw new UnauthorizedException();
    }

    if (columnId) {
      const column = await this.prisma.column.findUnique({
        where: { id: columnId },
      });
      if (!column || column.userId !== userId) {
        throw new UnauthorizedException('User does not own this column');
      }
    }

    if (cardId) {
      const card = await this.prisma.card.findUnique({ where: { id: cardId } });
      if (!card || card.userId !== userId) {
        throw new UnauthorizedException('User does not own this card');
      }
    }

    if (commentId) {
      const comment = await this.prisma.comment.findUnique({
        where: { id: commentId },
      });
      if (!comment || comment.userId !== userId) {
        throw new UnauthorizedException('User does not own this comment');
      }
    }

    return true;
  }
}
