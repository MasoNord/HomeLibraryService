import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackController } from 'src/track/track.controller';
import { AlbumController } from 'src/album/album.controller';
import { ArtistController } from 'src/artist/artist.controller';
import { PrismaModule } from 'src/nest/prismanpx/prisma.module';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService],
  imports: [PrismaModule]
})
export class FavoriteModule {}
