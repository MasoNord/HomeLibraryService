import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, ClassSerializerInterceptor, UseInterceptors, ParseUUIDPipe, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiBody, ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiNotFoundResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';


@ApiTags('user')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Post()
  @ApiOperation({summary: 'Create user', description: "Creates new user"})
  @ApiBody({type: CreateUserDto})
  @ApiBadRequestResponse({description: 'Body does not contain required field'})
  @ApiCreatedResponse({description: 'The user has been created', type: User})
  
  create(@Body() body: CreateUserDto): User {
    const newUser: User = this.userService.create(body);
    return new User(newUser);
  }

  @Get()
  @ApiOperation({summary: 'Get user', description: 'Get all users'})
  @ApiOkResponse({isArray: true, type: User, description: 'OK'})
  findAll(): User[] {
    return this.userService.findAll().map((u) => new User(u));
  }
  
  @Get(':id')
  @ApiOperation({summary: 'Get user', description: 'Get user by id'})
  @ApiParam({name: 'id', format: 'uuid'})
  @ApiOkResponse({description: 'OK', type: User})
  @ApiNotFoundResponse({description: 'User not found'})
  @ApiBadRequestResponse({description: 'Id is not uuid format'})

  findOne(@Param('id', ParseUUIDPipe) id: string): User {
    const user: User | null = this.userService.findOne(id);
    
    if(!user)
      throw new HttpException("Record has not been found", HttpStatus.NOT_FOUND)
    
    return new User(user);
  }

  @Put(':id')
  @ApiOperation({summary: "Update a user's info", description: "Update a user's password"})
  @ApiParam({name: 'id', format: 'uuid'})
  @ApiBody({type: UpdateUserDto})
  @ApiOkResponse({description: 'OK', type: User})
  @ApiNotFoundResponse({description: 'User not found'})
  @ApiBadRequestResponse({description: 'Id is not uuid format'})
  @ApiForbiddenResponse({description: "User's old password is incorrect"})

  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto): User {
    const userIndex: number | null = this.userService.findAll().findIndex(u => u.id === id);
    
    if(userIndex === null)
      throw new HttpException("Record has not been found", HttpStatus.NOT_FOUND);

    if(this.userService.findAll()[userIndex].password !== updateUserDto.oldPassword)
      throw new HttpException("oldPassword is invalid", HttpStatus.FORBIDDEN);
    const updatedUser = this.userService.update(userIndex, updateUserDto);

    return new User(updatedUser);
  }

  @Delete(':id')
  @ApiOperation({summary: "Remove user from db", description: "Delete a user's record"})
  @ApiParam({name: 'id', format: 'uuid'})
  @ApiNotFoundResponse({description: 'User not found'})
  @ApiBadRequestResponse({description: 'Id is not uuid format'})
  @ApiOkResponse({description: 'OK'})
  
  remove(@Param('id', ParseUUIDPipe) id: string) {
    const userIndex: number | null = this.userService.findAll().findIndex(u => u.id === id);

    if(userIndex === null)
      throw new HttpException("Record has not been found", HttpStatus.NOT_FOUND);
    
    return this.userService.remove(userIndex, id);
  }
}
