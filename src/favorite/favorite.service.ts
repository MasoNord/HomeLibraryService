import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Track } from 'src/track/entity/track.entity';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';

@Injectable()
export class FavoriteService {
  
  private favs: CreateFavoriteDto = {tracks: [], albums: [], artists: []};
  
  addTrack(track: Track): void {
    this.favs.tracks.push(track);
  }

  addAlbum(album: Album): void {
    this.favs.albums.push(album);
  }

  addArtist(artist: Artist): Artist {
    this.favs.artists.push(artist);

    return artist;
  }

  findAll(): CreateFavoriteDto{
    return this.favs;
  }

  removeTrack(trackIndex: number) {
      this.favs.tracks.splice(trackIndex, 1);
  }

  removeArtist(artistIndex: number) {
    this.favs.artists.splice(artistIndex, 1);
  }

  removeAlbum(albumIndex: number) {
    this.favs.albums.splice(albumIndex, 1);
  }
}
