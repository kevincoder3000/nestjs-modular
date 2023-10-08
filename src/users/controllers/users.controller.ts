import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dtos';
import { UsersService } from '../services/users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'List of users' })
  @Get()
  @HttpCode(HttpStatus.ACCEPTED)
  getUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateUserDto) {
    this.usersService.findOne(+id);
    return this.usersService.update(+id, payload);
  }

  @Patch(':id')
  updateMerge(@Param('id') id: number, @Body() payload: UpdateUserDto) {
    const product = this.usersService.findOne(+id);
    const newProduct = { ...product, ...payload };
    return this.usersService.update(+id, newProduct);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
