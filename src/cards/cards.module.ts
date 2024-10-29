import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [JwtModule, DatabaseModule, ConfigModule],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
