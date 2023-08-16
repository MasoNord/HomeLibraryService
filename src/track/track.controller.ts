import { Controller, Get, Post, Body, Patch, UseInterceptors, Param, Delete, ClassSerializerInterceptor, HttpCode, HttpStatus, ParseUUIDPipe, HttpException, Put } from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ApiOperation,ApiParam, ApiForbiddenResponse, ApiTags, ApiBody, ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse} from '@nestjs/swagger';
import { Track } from './entity/track.entity';
import { FavoriteService } from 'src/favorite/favorite.service';

@ApiTags('track')
@Controller('track')
@UseInterceptors(ClassSerializerInterceptor)
export class TrackController {
  constructor(
    private readonly trackService: TrackService,
  ){}

  @Post()
  @ApiOperation({summary: 'Add track', description: 'Add new track'})
  @ApiBody({type: CreateTrackDto})
  @ApiBadRequestResponse({description: 'Body does not contain required field'})
  @ApiCreatedResponse({description: 'The track has been added', type: Track})
  
  create(@Body() body: CreateTrackDto): Promise<any> {
    return this.trackService.create(body);
  }

  @Get()
  @ApiOperation({summary: 'Get track', description: 'Get all tracks'})
  @ApiOkResponse({isArray: true, type: Track, description: 'OK'})
  @HttpCode(HttpStatus.OK)
  
  findAll(): Promise<any> {
    return this.trackService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get track', description: 'Get track by id'})
  @ApiParam({name: 'id', format: 'uuid'})
  @ApiOkResponse({description: 'OK', type: Track})
  @ApiNotFoundResponse({description: 'Track has not been found'})
  @ApiBadRequestResponse({description: 'Id is not uuid format'})
  
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    return this.trackService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({summary: "Update a track's info", description: "Update a track's info"})
  @ApiParam({name: 'id', format: 'uuid'})
  @ApiBody({type: UpdateTrackDto})
  @ApiOkResponse({description: 'OK', type: Track})
  @ApiNotFoundResponse({description: 'Track not found'})
  @ApiBadRequestResponse({description: 'Id is not uuid format'})
  
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTrackDto: UpdateTrackDto): Promise<any> {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @ApiOperation({summary: "Remove track", description: "Delete a track's record"})
  @ApiParam({name: 'id', format: 'uuid'})
  @ApiNotFoundResponse({description: 'Track has not been found'})
  @ApiBadRequestResponse({description: 'Id is not uuid format'})
  @ApiOkResponse({description: 'OK'})
  @HttpCode(HttpStatus.NO_CONTENT)
  
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.trackService.remove(id);
  }
}
