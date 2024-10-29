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
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { OwnershipGuard } from 'src/guards/ownership.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiOkResponse } from '@nestjs/swagger';
import { CommentRto } from './rto/comment.rto';
import { DeleteCommentRto } from './rto/delete-comment.dto';
import { CreateCommentRto } from './rto/create-comment.rto';

@Controller('users/:userId/columns/:columnId/cards/:cardId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOkResponse({
    description: 'The create comment',
    type: CreateCommentRto,
    isArray: false,
  })
  @UseGuards(AuthGuard, OwnershipGuard)
  @Post()
  createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Param('cardId', ParseIntPipe) cardId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.commentsService.createComment(createCommentDto, cardId, userId);
  }

  @ApiOkResponse({
    description: 'The getting all comments',
    type: CommentRto,
    isArray: true,
  })
  @UseGuards(AuthGuard)
  @Get()
  getAllComments(@Param('cardId', ParseIntPipe) cardId: number) {
    return this.commentsService.getAllComments(cardId);
  }

  @ApiOkResponse({
    description: 'The getting one comment',
    type: CommentRto,
    isArray: false,
  })
  @UseGuards(AuthGuard)
  @Get(':commentId')
  getOneComment(@Param('commentId', ParseIntPipe) id: number) {
    return this.commentsService.getOneComment(id);
  }

  @ApiOkResponse({
    description: 'The update comment',
    type: CommentRto,
    isArray: false,
  })
  @UseGuards(AuthGuard, OwnershipGuard)
  @Patch(':commentId')
  updateComment(
    @Param('commentId', ParseIntPipe) id: number,

    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.updateComment(id, updateCommentDto);
  }

  @ApiOkResponse({
    description: 'The delete comment',
    type: DeleteCommentRto,
    isArray: false,
  })
  @UseGuards(AuthGuard, OwnershipGuard)
  @Delete(':commentId')
  removeComment(@Param('commentId', ParseIntPipe) id: number) {
    return this.commentsService.removeComment(id);
  }
}
