import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { FavoriteController } from 'src/favorite/favorite.controller';
import { FavoriteService } from 'src/favorite/favorite.service';
import { ArtistController } from 'src/artist/artist.controller';
import { AlbumController } from 'src/album/album.controller';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { PrismaModule } from 'src/nest/prismanpx/prisma.module';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [PrismaModule]
})
export class TrackModule {}
