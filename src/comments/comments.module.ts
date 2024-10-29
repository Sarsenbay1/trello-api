import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule, DatabaseModule, ConfigModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
