import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import {v4} from 'uuid'
import { Track } from './entity/track.entity';
import { PrismaService } from 'src/nest/prismanpx/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}
  
  public async create(createTrackDto: CreateTrackDto): Promise<any> {
    const newTrack = await this.prisma.track.upsert({
      where: {id: v4()},
      update: {},
      create: {
        id: v4(),
        name: createTrackDto.name,
        duration: createTrackDto.duration,
        albumId: createTrackDto.albumId,
        artistId: createTrackDto.artistId,
      }
    })

    return new Track(newTrack);
  }

  public async findAll(): Promise<any> {
    return (await this.prisma.track.findMany()).map((t) => new Track(t));
  }

  public async findOne(id: string): Promise<any> {
    const track = await this.prisma.track.findUnique({
      where: { id }
    });

    if (track === null)
      throw new HttpException("Record has not been found", HttpStatus.NOT_FOUND);

    return new Track(track);
  }

  public async update(id: string, updateTrackDto: UpdateTrackDto): Promise<any> {
    let track = await this.prisma.track.findUnique({
      where: {id}
    });

    if(track === null) 
      throw new HttpException("Record has not been found", HttpStatus.NOT_FOUND);

    track = await this.prisma.track.update({
      where: { id },
      data: {
        name: updateTrackDto.name,
        duration: updateTrackDto.duration,
        artistId: updateTrackDto.artistId,
        albumId: updateTrackDto.albumId
      } 
    });

    return new Track(track);
  }

  public async remove(id: string): Promise<any>  {
    const track = await this.prisma.track.findUnique({
      where: { id }
    });
    const fav = await this.prisma.favorite.findUnique({where: {id: 1}, include: {tracks: true}})
    const trackIndex = fav.tracks.findIndex((t) => t.id === id);

    if (track === null)
      throw new HttpException("Record has not been found", HttpStatus.NOT_FOUND);

    if(trackIndex !== -1) {
      fav.tracks.splice(trackIndex, 1);
      
      await this.prisma.favorite.update({
        where: {id: 1},
        include: {tracks: true},
        data: {
          tracks: {
            set: fav.tracks
          }
        }
      });
    }
  
    await this.prisma.track.delete({
      where: { id }
    });
  }
}
