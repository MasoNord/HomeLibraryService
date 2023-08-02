import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { FavoriteController } from 'src/favorite/favorite.controller';
import { FavoriteService } from 'src/favorite/favorite.service';
import { ArtistController } from 'src/artist/artist.controller';
import { AlbumController } from 'src/album/album.controller';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';

@Module({
  controllers: [TrackController, FavoriteController, ArtistController, AlbumController],
  providers: [TrackService, FavoriteService, ArtistService, AlbumService]
})
export class TrackModule {}
