import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import {v4} from 'uuid'
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaClient) {}
  
  public async create(createAlbumDto: CreateAlbumDto): Promise<any> {
    const newAlbum = await this.prisma.album.upsert({
      where: {id: v4()},
      update: {},
      create: {
        id: v4(),
        name: createAlbumDto.name,
        artistId: createAlbumDto.artistId,
        year: createAlbumDto.year
      }
    })

    return new Album(newAlbum);
  }

  public async findAll(): Promise<any> {
    return (await this.prisma.album.findMany()).map(a => new Album(a));
  }

  public async findOne(id: string): Promise<any> {
    const album = await this.prisma.album.findUnique({
      where: { id }
    });
    
    if(album === null)
      throw new HttpException("Record has not been found", HttpStatus.NOT_FOUND);

    return new Album(album);
  }

  public async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<any> {
    let album = await this.prisma.album.findUnique({
      where: { id }
    });

    if(album === null)
      throw new HttpException("Record has not been found", HttpStatus.NOT_FOUND);

    album = await this.prisma.album.update({
      where: { id },
      data: {
        name: updateAlbumDto.name,
        year: updateAlbumDto.year,
        artistId: updateAlbumDto.artistId
      }
    });

    return new Album(album);
  }

  public async remove(id: string): Promise<void> {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });
    
    if(album === null)
      throw new HttpException("Record has not been found", HttpStatus.NOT_FOUND);
    
    this.prisma.album.delete({
      where: { id }
    });

    (await this.prisma.track.findMany()).forEach(t => {
      if(t.albumId === id)
        t.albumId = null;
    });

    const fav = await this.prisma.favorite.findUnique({where: {id: 1}});

    for (let i = 0; i < fav.albums.length; ++i) {
      if (fav.albums[i] === id)
        fav.albums.splice(i, 1);
    }
  }
}
