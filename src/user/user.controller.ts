import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, ClassSerializerInterceptor, UseInterceptors, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Post()
  @HttpCode(204)
  create(@Body() body: CreateUserDto, @Res() res: Response) {
    const newUser: CreateUserDto = this.userService.create(body.login, body.password);
    res.status(HttpStatus.CREATED).json(newUser)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll(@Res() res: Response) {
    res.status(HttpStatus.OK).json(this.userService.findAll());
  }
  
  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    res.status(HttpStatus.OK).json(this.userService.findOne(id));

  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    res.status(HttpStatus.OK).json(this.userService.update(id, updateUserDto));
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    res.status(HttpStatus.OK).json(this.userService.remove(id));
  }
}
