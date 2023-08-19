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
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@ApiTags('artist')
@Controller('artist')
@UseInterceptors(ClassSerializerInterceptor)
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @ApiOperation({ summary: 'Create artis', description: 'Creates new artist' })
  @ApiBody({ type: CreateArtistDto })
  @ApiBadRequestResponse({
    description: 'Body does not contain required field',
  })
  @ApiCreatedResponse({
    description: 'The artist has been created',
    type: Artist,
  })
  create(@Body() body: CreateArtistDto): Promise<any> {
    return this.artistService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get artist', description: 'Get all artists' })
  @ApiOkResponse({ isArray: true, type: Artist, description: 'OK' })
  findAll(): Promise<any> {
    return this.artistService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get artist', description: 'Get artist by id' })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ description: 'OK', type: Artist })
  @ApiNotFoundResponse({ description: 'Artist not found' })
  @ApiBadRequestResponse({ description: 'Id is not uuid format' })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    return this.artistService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: "Update a artist's record",
    description: "Update a artist's record",
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiBody({ type: UpdateArtistDto })
  @ApiOkResponse({ description: 'OK', type: Artist })
  @ApiNotFoundResponse({ description: 'Artist not found' })
  @ApiBadRequestResponse({ description: 'Id is not uuid format' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<any> {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remove a artist',
    description: "Delete a artist's record",
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiNotFoundResponse({ description: 'Artist not found' })
  @ApiBadRequestResponse({ description: 'Id is not uuid format' })
  @ApiOkResponse({ description: 'OK' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.artistService.remove(id);
  }
}
