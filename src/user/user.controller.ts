import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpStatus,
  ClassSerializerInterceptor,
  UseInterceptors,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('user')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user', description: 'Creates new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiBadRequestResponse({
    description: 'Body does not contain required field',
  })
  @ApiCreatedResponse({ description: 'The user has been created', type: User })
  create(@Body() body: CreateUserDto): Promise<any> {
    return this.userService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get user', description: 'Get all users' })
  @ApiOkResponse({ isArray: true, type: User, description: 'OK' })
  findAll(): Promise<any> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user', description: 'Get user by id' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ description: 'OK', type: User })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Id is not uuid format' })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    const user: null | Promise<any> = this.userService.findOne(id);

    return user;
  }

  @Put(':id')
  @ApiOperation({
    summary: "Update a user's info",
    description: "Update a user's password",
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ description: 'OK', type: User })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Id is not uuid format' })
  @ApiForbiddenResponse({ description: "User's old password is incorrect" })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    const updatedAt = Date.now() / 1000;

    const updatedUser: null | Promise<any> = this.userService.update(
      id,
      updateUserDto,
      updatedAt,
    );

    return updatedUser;
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remove user',
    description: "Delete a user's record",
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Id is not uuid format' })
  @ApiOkResponse({ description: 'OK' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    return this.userService.remove(id);
  }
}
