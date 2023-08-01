import { Controller, Get, Post, HttpCode, Param, Delete, UseInterceptors, ClassSerializerInterceptor, ParseUUIDPipe, HttpException, HttpStatus} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { Track } from 'src/track/entity/track.entity';
import { ApiTags, ApiOperation, ApiBody, ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiNotFoundResponse, ApiUnprocessableEntityResponse, ApiNoContentResponse } from '@nestjs/swagger';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';

@ApiTags('favs')
@Controller('favs')
@UseInterceptors(ClassSerializerInterceptor)
export class FavoriteController {
  constructor(
    private readonly favoriteService: FavoriteService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService
  ) {}

  @Post('/track/:id')
  @ApiOperation({summary: 'Add track to favoriter'})
  @ApiBadRequestResponse({description: 'Id is not uuid format'})
  @ApiUnprocessableEntityResponse({description: 'Track record doen not exist'})
  @ApiCreatedResponse({description: 'OK', type: Track})

  addTrack(@Param('id', ParseUUIDPipe) trackId: string) {
    let track: Track | null = null;

    this.trackService.findAll().forEach(t => {
      if (t.id === trackId)
        track = t;
    });

    if (!track)
      throw new HttpException("Track has not been found", HttpStatus.UNPROCESSABLE_ENTITY);
    
    this.favoriteService.addTrack(track);
  }

  @Post('/album/:id')
  @ApiOperation({summary: 'Add album to favoriter'})
  @ApiBadRequestResponse({description: 'Id is not uuid format'})
  @ApiUnprocessableEntityResponse({description: 'Album record doen not exist'})
  @ApiCreatedResponse({description: 'OK', type: Album})

  addAlbum(@Param('id', ParseUUIDPipe) albumId: string) {
    let album: Album | null = null;

    this.albumService.findAll().forEach(a => {
      if(a.id === albumId)
        album = a;
    });

    if (!album)
      throw new HttpException("Track has not been found", HttpStatus.UNPROCESSABLE_ENTITY);

    this.favoriteService.addAlbum(album);
  }

  @Post('/artist/:id')
  @ApiOperation({summary: 'Add artist to favoriter'})
  @ApiBadRequestResponse({description: 'Id is not uuid format'})
  @ApiUnprocessableEntityResponse({description: 'Artist record doen not exist'})
  @ApiCreatedResponse({description: 'OK', type: Artist})

  addArtist(@Param('id', ParseUUIDPipe) artistId: string) {
    let artist: Artist | null = null;

    this.artistService.findAll().forEach(a => {
      if(a.id === artistId)
        artist = a;
    });

    if(!artist)
      throw new HttpException("Track has not been found", HttpStatus.UNPROCESSABLE_ENTITY);

    this.favoriteService.addArtist(artist)
  }

  @Delete('track/:id')
  @ApiOperation({summary: 'Remove track from favorite'})
  @ApiBadRequestResponse({description: 'Id is not uuid format'})
  @ApiNotFoundResponse({description: 'The track is not favorite'})
  @ApiNoContentResponse({description: 'NO_CONTENT'})
  @HttpCode(HttpStatus.NO_CONTENT)

  removeTrack(@Param('id', ParseUUIDPipe) trackId: string) {
    const favTrackIndex: number = this.favoriteService.findAll().tracks.findIndex(t => t.id === trackId);

    if(favTrackIndex === -1)
      throw new HttpException("The track is not favorite", HttpStatus.NOT_FOUND);
    
    this.favoriteService.removeTrack(favTrackIndex);
  }

  @Delete('artist/:id')
  @ApiOperation({summary: 'Remove artist from favorite'})
  @ApiBadRequestResponse({description: 'Id is not uuid format'})
  @ApiNotFoundResponse({description: 'The artist is not favorite'})
  @ApiNoContentResponse({description: 'NO_CONTENT'})
  @HttpCode(HttpStatus.NO_CONTENT)

  removeArtist(@Param('id', ParseUUIDPipe) artistId: string) {
    const favArtistIndex: number = this.favoriteService.findAll().artists.findIndex(t => t.id === artistId);

    if(favArtistIndex === -1)
      throw new HttpException("The track is not favorite", HttpStatus.NOT_FOUND);
    
    this.favoriteService.removeArtist(favArtistIndex);
  }

  @Delete('album/:id')
  @ApiOperation({summary: 'Remove album from favorite'})
  @ApiBadRequestResponse({description: 'Id is not uuid format'})
  @ApiNotFoundResponse({description: 'The album is not favorite'})
  @ApiNoContentResponse({description: 'NO_CONTENT'})
  @HttpCode(HttpStatus.NO_CONTENT)

  removeAlbum(@Param('id', ParseUUIDPipe) albumId: string) {
    const favAlbumIndex: number = this.favoriteService.findAll().albums.findIndex(t => t.id === albumId);

    if(favAlbumIndex === -1)
      throw new HttpException("The track is not favorite", HttpStatus.NOT_FOUND);
    
    this.favoriteService.removeAlbum(favAlbumIndex);
  }

  @Get()
  @ApiOperation({summary: 'Get all favorites'})
  @ApiCreatedResponse({description: 'OK', type: CreateFavoriteDto})
  findAll(): CreateFavoriteDto {
    return this.favoriteService.findAll();
  }
}
