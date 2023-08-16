import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { AlbumController } from 'src/album/album.controller';
import { AlbumService } from 'src/album/album.service';
import { TrackController } from 'src/track/track.controller';
import { TrackService } from 'src/track/track.service';
import { FavoriteController } from 'src/favorite/favorite.controller';
import { FavoriteService } from 'src/favorite/favorite.service';
import { PrismaModule } from 'src/nest/prismanpx/prisma.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [PrismaModule],
})
export class ArtistModule {}
