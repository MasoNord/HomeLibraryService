import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, ClassSerializerInterceptor, UseInterceptors, ParseUUIDPipe, HttpException, HttpCode } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ApiTags, ApiOperation, ApiBody, ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiNotFoundResponse } from '@nestjs/swagger';
import { Album } from './entities/album.entity';
  
@ApiTags('album')
@Controller('album')
@UseInterceptors(ClassSerializerInterceptor)
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
  ){}

  @Post()
  @ApiOperation({summary: 'Create album', description: "Creates new album"})
  @ApiBody({type: CreateAlbumDto})
  @ApiBadRequestResponse({description: 'Body does not contain required field'})
  @ApiCreatedResponse({description: 'The album has been created', type: Album})
  
  create(@Body() createAlbumDto: CreateAlbumDto): Promise<any> {
    const newAlbum = this.albumService.create(createAlbumDto);
    
    return newAlbum;
  }

  @Get()
  @ApiOperation({summary: 'Get album', description: 'Get all albums'})
  @ApiOkResponse({isArray: true, type: Album, description: 'OK'})
  
  findAll(): Promise<any> {
    return this.albumService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get album', description: 'Get album by id'})
  @ApiParam({name: 'id', format: 'uuid'})
  @ApiOkResponse({description: 'OK', type: Album})
  @ApiNotFoundResponse({description: 'Album not found'})
  @ApiBadRequestResponse({description: 'Id is not uuid format'})
  
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    const album = this.albumService.findOne(id);

    return album;
  }

  @Put(':id')
  @ApiOperation({summary: "Update a album's info", description: "Update a album's info"})
  @ApiParam({name: 'id', format: 'uuid'})
  @ApiBody({type: UpdateAlbumDto})
  @ApiOkResponse({description: 'OK', type: Album})
  @ApiNotFoundResponse({description: 'Album not found'})
  @ApiBadRequestResponse({description: 'Id is not uuid format'})
  
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateAlbumDto: UpdateAlbumDto): Promise<any> {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @ApiOperation({summary: "Remove album", description: "Delete a album's record by id"})
  @ApiParam({name: 'id', format: 'uuid'})
  @ApiNotFoundResponse({description: 'Album not found'})
  @ApiBadRequestResponse({description: 'Id is not uuid format'})
  @ApiOkResponse({description: 'OK'})
  @HttpCode(HttpStatus.NO_CONTENT)
  
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.albumService.remove(id);
  }
}
