import { Controller, Get, Post, HttpCode, Param, Delete, UseInterceptors, ClassSerializerInterceptor, ParseUUIDPipe, HttpException, HttpStatus} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Track } from 'src/track/entity/track.entity';
import { ApiTags, ApiOperation, ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiNotFoundResponse, ApiUnprocessableEntityResponse, ApiNoContentResponse } from '@nestjs/swagger';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';

@ApiTags('favs')
@Controller('favs')
@UseInterceptors(ClassSerializerInterceptor)
export class FavoriteController {
  constructor(
    private readonly favoriteService: FavoriteService,
  ) {}

  @Post('/track/:id')
  @ApiOperation({summary: 'Add track to favoriter'})
  @ApiBadRequestResponse({description: 'Id is not uuid format'})
  @ApiUnprocessableEntityResponse({description: 'Track record doen not exist'})
  @ApiCreatedResponse({description: 'OK', type: Track})

  addTrack(@Param('id', ParseUUIDPipe) trackId: string): Promise<any>{
    return this.favoriteService.addTrack(trackId);
  }

  @Post('/album/:id')
  @ApiOperation({summary: 'Add album to favoriter'})
  @ApiBadRequestResponse({description: 'Id is not uuid format'})
  @ApiUnprocessableEntityResponse({description: 'Album record doen not exist'})
  @ApiCreatedResponse({description: 'OK', type: Album})

  addAlbum(@Param('id', ParseUUIDPipe) albumId: string): Promise<any> {
    return this.favoriteService.addAlbum(albumId);
  }

  @Post('/artist/:id')
  @ApiOperation({summary: 'Add artist to favoriter'})
  @ApiBadRequestResponse({description: 'Id is not uuid format'})
  @ApiUnprocessableEntityResponse({description: 'Artist record doen not exist'})
  @ApiCreatedResponse({description: 'OK', type: Artist})

  addArtist(@Param('id', ParseUUIDPipe) artistId: string): Promise<any> {
    return this.favoriteService.addArtist(artistId);
  }

  @Delete('track/:id')
  @ApiOperation({summary: 'Remove track from favorite'})
  @ApiBadRequestResponse({description: 'Id is not uuid format'})
  @ApiNotFoundResponse({description: 'The track is not favorite'})
  @ApiNoContentResponse({description: 'NO_CONTENT'})
  @HttpCode(HttpStatus.NO_CONTENT)

  removeTrack(@Param('id', ParseUUIDPipe) trackId: string): Promise<void> {
    return this.favoriteService.removeTrack(trackId);
  }

  @Delete('artist/:id')
  @ApiOperation({summary: 'Remove artist from favorite'})
  @ApiBadRequestResponse({description: 'Id is not uuid format'})
  @ApiNotFoundResponse({description: 'The artist is not favorite'})
  @ApiNoContentResponse({description: 'NO_CONTENT'})
  @HttpCode(HttpStatus.NO_CONTENT)

  removeArtist(@Param('id', ParseUUIDPipe) artistId: string): Promise<void> {
    return this.favoriteService.removeArtist(artistId);
  }

  @Delete('album/:id')
  @ApiOperation({summary: 'Remove album from favorite'})
  @ApiBadRequestResponse({description: 'Id is not uuid format'})
  @ApiNotFoundResponse({description: 'The album is not favorite'})
  @ApiNoContentResponse({description: 'NO_CONTENT'})
  @HttpCode(HttpStatus.NO_CONTENT)

  removeAlbum(@Param('id', ParseUUIDPipe) albumId: string): Promise<void> {
    return this.favoriteService.removeAlbum(albumId);
  }

  @Get()
  @ApiOperation({summary: 'Get all favorites'})
  @ApiCreatedResponse({description: 'OK', type: CreateFavoriteDto})
  findAll(): Promise<any> {
    return this.favoriteService.findAll();
  }
}
