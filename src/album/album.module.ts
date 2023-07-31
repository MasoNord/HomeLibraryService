import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackController } from 'src/track/track.controller';
import { TrackService } from 'src/track/track.service';

@Module({
  controllers: [AlbumController, TrackController],
  providers: [AlbumService, TrackService]
})
export class AlbumModule {}
