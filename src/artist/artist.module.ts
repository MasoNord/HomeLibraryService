import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { AlbumController } from 'src/album/album.controller';
import { AlbumService } from 'src/album/album.service';
import { TrackController } from 'src/track/track.controller';
import { TrackService } from 'src/track/track.service';

@Module({
  controllers: [ArtistController, AlbumController, TrackController],
  providers: [ArtistService, AlbumService, TrackService]
})
export class ArtistModule {}
