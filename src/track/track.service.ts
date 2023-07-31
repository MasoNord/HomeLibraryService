import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import {v4 as uuid4} from 'uuid'
import { Track } from './entity/track.entity';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];
  
  create(createTrackDto: CreateTrackDto): Track {
    const newTrack: Track = {id: uuid4(), ...createTrackDto,}

    this.tracks.push(newTrack)

    return newTrack;
  }

  findAll(): Track[] {
    return [...this.tracks];
  }

  findOne(id: string): Track {
    const track = this.tracks.find(u => u.id === id);

    return track;
  }

  update(trackIndex: number, updateTrackDto: UpdateTrackDto): Track {
    this.tracks[trackIndex] = {...this.tracks[trackIndex], ...updateTrackDto}
    return this.tracks[trackIndex];
  }

  remove(trackIndex: number, id: string) {
    this.tracks.splice(trackIndex, 1);

    return {message: `Track with ${id} has been removed`};
  }
}
