import { Injectable} from '@nestjs/common';
import {Artist} from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import {v4} from 'uuid'

@Injectable()
export class ArtistService {
  private artists: Artist[] = [];
  
  create(createArtistDto: CreateArtistDto): Artist {
    const artist = {
      id: v4(),
      ...createArtistDto
    }

    this.artists.push(artist);

    return artist;
  }

  findAll(): Artist[] {
    return this.artists;
  }

  findOne(id: string) {
    const artist = this.artists.find(u => u.id === id);
    if (!artist)
      return null;
    
    return artist;
  }

  update(artistIndex: number, updateArtistDto: UpdateArtistDto): Artist {
    this.artists[artistIndex] = {...this.artists[artistIndex], ...updateArtistDto};

    return this.artists[artistIndex]
  }

  remove(artistIndex: number, id: string) {    
    this.artists.splice(artistIndex, 1);

    return {message: `Artist with ${id} was removed`};
  }
}
