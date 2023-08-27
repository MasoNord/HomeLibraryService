import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { v4 } from 'uuid';
import { PrismaService } from 'src/nest/prismanpx/prisma.service';
@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  public async create(createAlbumDto: CreateAlbumDto): Promise<any> {
    const newAlbum = await this.prisma.album.upsert({
      where: { id: v4() },
      update: {},
      create: {
        id: v4(),
        name: createAlbumDto.name,
        artistId: createAlbumDto.artistId,
        year: createAlbumDto.year,
      },
    });

    return new Album(newAlbum);
  }

  public async findAll(): Promise<any> {
    return (await this.prisma.album.findMany()).map((a) => new Album(a));
  }

  public async findOne(id: string): Promise<any> {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });

    if (album === null)
      throw new HttpException(
        'Record has not been found',
        HttpStatus.NOT_FOUND,
      );

    return new Album(album);
  }

  public async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<any> {
    let album = await this.prisma.album.findUnique({
      where: { id },
    });

    if (album === null)
      throw new HttpException(
        'Record has not been found',
        HttpStatus.NOT_FOUND,
      );

    album = await this.prisma.album.update({
      where: { id },
      data: {
        name: updateAlbumDto.name,
        year: updateAlbumDto.year,
        artistId: updateAlbumDto.artistId,
      },
    });

    return new Album(album);
  }

  public async remove(id: string): Promise<void> {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });
    const fav = await this.prisma.favorite.findUnique({
      where: { id: 1 },
      select: { albums: true },
    });
    const albumIndex = fav.albums.findIndex((a) => a.id === id);

    if (album === null)
      throw new HttpException(
        'Record has not been found',
        HttpStatus.NOT_FOUND,
      );

    if (albumIndex !== -1) {
      fav.albums.splice(albumIndex, 1);
      await this.prisma.favorite.update({
        where: { id: 1 },
        include: {
          albums: true,
        },
        data: {
          albums: {
            set: fav.albums,
          },
        },
      });
    }

    (await this.prisma.track.findMany()).forEach(async (t) => {
      if (t.albumId === id) {
        await this.prisma.track.update({
          where: { id: t.id },
          data: {
            albumId: null,
          },
        });
      }
    });

    await this.prisma.album.delete({
      where: { id },
    });
  }
}
