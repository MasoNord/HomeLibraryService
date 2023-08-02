import { Injectable} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import {v4} from 'uuid'
import { TrackService } from 'src/track/track.service';

@Injectable()
export class AlbumService {
  
  private albums: Album[] = [];
  private trackService: TrackService;
  
  public create(createAlbumDto: CreateAlbumDto): Album {
    const newAlbum = {
      id: v4(),
      ...createAlbumDto
    }
    this.albums.push(newAlbum);

    return newAlbum;
  }

  public findAll(): Album[] {
    return this.albums;
  }

  findOne(id: string): Album {
    const album = this.albums.find(u => u.id === id);
    if(!album)
      return null;

    return album;
  }

  update(albumIndex: number, updateAlbumDto: UpdateAlbumDto): Album {
    this.albums[albumIndex] = {...this.albums[albumIndex], ...updateAlbumDto};
    return this.albums[albumIndex]
  }

  remove(albumIndex: number, id: string) {
    this.albums.splice(albumIndex, 1);
    
    return {message: `Album with ${id} was removed`};
  }
}
