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
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiOkResponse } from '@nestjs/swagger';
import { OwnershipGuard } from 'src/guards/ownership.guard';
import { ColumnRto } from './rto/column.rto';
import { DeleteColumnRto } from './rto/delete-column.rto';
import { CreateColumnRto } from './rto/create-column.rto';

@Controller('users/:userId/columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @ApiOkResponse({
    description: 'The create column',
    type: CreateColumnRto,
    isArray: false,
  })
  @UseGuards(AuthGuard, OwnershipGuard)
  @Post()
  createColumn(
    @Body() createColumnDto: CreateColumnDto,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.columnsService.createColumn(createColumnDto, userId);
  }
  @ApiOkResponse({
    description: 'The getting all columns',
    type: ColumnRto,
    isArray: true,
  })
  @UseGuards(AuthGuard)
  @Get()
  getAllColumn(@Param('userId', ParseIntPipe) userId: number) {
    return this.columnsService.getAllColumn(userId);
  }

  @ApiOkResponse({
    description: 'The getting column',
    type: ColumnRto,
    isArray: false,
  })
  @UseGuards(AuthGuard)
  @Get(':columnId')
  getOneColumn(@Param('columnId', ParseIntPipe) id: number) {
    console.log('POL');
    return this.columnsService.getOneColumn(id);
  }

  @ApiOkResponse({
    description: 'The update column',
    type: ColumnRto,
    isArray: false,
  })
  @UseGuards(AuthGuard, OwnershipGuard)
  @Patch(':columnId')
  updateColumn(
    @Param('columnId', ParseIntPipe) id: number,
    @Body() updateColumnDto: UpdateColumnDto,
  ) {
    return this.columnsService.updateColumn(id, updateColumnDto);
  }

  @ApiOkResponse({
    description: 'The delete column',
    type: DeleteColumnRto,
    isArray: false,
  })
  @UseGuards(AuthGuard, OwnershipGuard)
  @Delete(':columnId')
  removeColumn(@Param('columnId', ParseIntPipe) id: number) {
    return this.columnsService.removeColumn(id);
  }
}
