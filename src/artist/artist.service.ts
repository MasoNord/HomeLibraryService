import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import {Artist} from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import {v4} from 'uuid'
import { PrismaService } from 'src/nest/prismanpx/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}
  
  public async create(createArtistDto: CreateArtistDto): Promise<any> {
    const artist = await this.prisma.artist.upsert({
      where: {id: v4()},
      update: {},
      create: {
        id: v4(),
        name: createArtistDto.name,
        grammy: createArtistDto.grammy
      }
    }) 

    return new Artist(artist);
  }

  public async findAll(): Promise<any> {
    return ((await this.prisma.artist.findMany()).map(a => new Artist(a)));
  }

  public async findOne(id: string): Promise<any> {
    const artist = await this.prisma.artist.findUnique({where: { id }});
    
    if (artist === null)
      throw new HttpException("Record has not been found", HttpStatus.NOT_FOUND);
    
    return new Artist(artist);
  }

  public async update(id: string, updateArtistDto: UpdateArtistDto): Promise<any> {
    let artist = await this.prisma.artist.findUnique({where: { id }});

    if (artist === null)
      throw new HttpException("Record has not been found", HttpStatus.NOT_FOUND);

    artist = await this.prisma.artist.update({
      where: { id },
      data: {
        name: updateArtistDto.name,
        grammy: updateArtistDto.grammy
      }
    })

    return new Artist(artist);
  }

  public async remove(id: string) {    
    const artist = await this.prisma.artist.findUnique({where: { id }});
    const fav = await this.prisma.favorite.findUnique({where: {id: 1}, select: {artists: true}});
    const artistIndex = fav.artists.findIndex((a) => a,id === id);

    if (artist === null)  
      throw new HttpException("Record has not been found", HttpStatus.NOT_FOUND);

    (await this.prisma.album.findMany()).forEach(async (a) => {
      if(a.artistId === id) {
        await this.prisma.album.update({
          where: { id: a.id},
          data: {
            artistId: null
          }
        });
      }
    });

    (await this.prisma.track.findMany()).forEach(async (t) => {
      if(t.artistId === id) {
        await this.prisma.track.update({
          where: {id: t.id},
          data: {
            artistId: null
          }
        })
      }
    });

    if(artistIndex !== -1) {
      fav.artists.splice(artistIndex, 1);

      await this.prisma.favorite.update({
        where: {id: 1},
        select: {
          artists: true
        },
        data: {
          artists: {
            set: fav.artists
          }
        } 
      });
    }
      

    await this.prisma.artist.delete({
      where: { id }
    });
  }
}
