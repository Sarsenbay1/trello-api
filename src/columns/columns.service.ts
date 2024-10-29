import { Injectable } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ColumnsService {
  constructor(private prisma: DatabaseService) {}

  async createColumn(createColumnDto: CreateColumnDto, userId: number) {
    return await this.prisma.column.create({
      data: { title: createColumnDto.title, user: { connect: { id: userId } } },
    });
  }

  async getAllColumn(userId: number) {
    const columns = await this.prisma.column.findMany({ where: { userId } });
    return columns;
  }

  async getOneColumn(id: number) {
    return await this.prisma.column.findUnique({ where: { id } });
  }

  async updateColumn(id: number, updateColumnDto: UpdateColumnDto) {
    return await this.prisma.column.update({
      where: { id },
      data: updateColumnDto,
    });
  }

  async removeColumn(id: number) {
    return await this.prisma.column.delete({ where: { id } });
  }
}
