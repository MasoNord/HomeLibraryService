import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackController } from 'src/track/track.controller';
import { TrackService } from 'src/track/track.service';
import { FavoriteController } from 'src/favorite/favorite.controller';
import { FavoriteService } from 'src/favorite/favorite.service';
import { ArtistController } from 'src/artist/artist.controller';
import { ArtistService } from 'src/artist/artist.service';
import { PrismaModule } from 'src/nest/prismanpx/prisma.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [PrismaModule]
})
export class AlbumModule {}
