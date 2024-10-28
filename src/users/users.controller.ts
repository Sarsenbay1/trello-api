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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginAuthDto, LoginAuthResponseDto } from './dto/login-auth.dto';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateUserRto } from './rto/update-user.rto';
import { UserRto } from './rto/user.rto';
import { DeleteUserRto } from './rto/delete-user.rto';
import { AuthGuard } from 'src/guards/auth.guard';
import { OwnershipGuard } from 'src/guards/ownership.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    description: 'Registration',
    type: UserRto,
    isArray: false,
  })
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Authorization' })
  @ApiOkResponse({ type: LoginAuthResponseDto })
  @ApiBody({ type: LoginAuthDto })
  @Post('login')
  signIn(@Body() loginDto: LoginAuthDto) {
    return this.usersService.signIn(loginDto.email, loginDto.password);
  }

  @ApiOkResponse({
    description: 'The getting a user',
    type: UserRto,
    isArray: false,
  })
  @UseGuards(AuthGuard, OwnershipGuard)
  @Get(':userId')
  getOneUser(@Param('userId', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @ApiOkResponse({
    description: 'The user update',
    type: UpdateUserRto,
    isArray: false,
  })
  @UseGuards(AuthGuard, OwnershipGuard)
  @Patch(':userId')
  updateUser(
    @Param('userId', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @ApiOkResponse({
    description: 'The deleting a user',
    type: DeleteUserRto,
    isArray: false,
  })
  @UseGuards(AuthGuard, OwnershipGuard)
  @Delete(':userId')
  removeUser(@Param('userId', ParseIntPipe) id: number) {
    return this.usersService.removeUser(id);
  }
}
