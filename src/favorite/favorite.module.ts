import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackController } from 'src/track/track.controller';
import { AlbumController } from 'src/album/album.controller';
import { ArtistController } from 'src/artist/artist.controller';

@Module({
  controllers: [FavoriteController, TrackController, AlbumController, ArtistController],
  providers: [FavoriteService, TrackService, AlbumService, ArtistService]
})
export class FavoriteModule {}
