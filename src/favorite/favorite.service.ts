import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/nest/prismanpx/prisma.service';


@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService){}

  public async addTrack(trackId: string): Promise<any> {
    const track = await this.prisma.track.findUnique({
      where: { id: trackId },
    });
    const fav = await this.prisma.favorite.findUnique({where: {id: 1}, include: {tracks: true}});

    if (track === null)
      throw new HttpException("Track has not been found", HttpStatus.UNPROCESSABLE_ENTITY);

    fav.tracks.push(track);

    await this.prisma.favorite.update({
      where: {id: 1},
      include: {
        tracks: true
      },
      data: {
        tracks: {
          set: fav.tracks
        }
      }
    })
  }

  public async addAlbum(albumId: string): Promise<any> {
    const album = await this.prisma.album.findUnique({
      where: {id: albumId}
    });
    const fav = await this.prisma.favorite.findUnique({
      where: {id: 1},
      include: {albums: true}
    });

    if(album === null)  
      throw new HttpException("Track has not been found", HttpStatus.UNPROCESSABLE_ENTITY);

    fav.albums.push(album);

    await this.prisma.favorite.update({
      where: {id: 1},
      include: {albums: true},
      data: {
        albums: {set: fav.albums}
      }
    })
  }

  public async addArtist(artistId: string): Promise<any> {
    const artist = await this.prisma.artist.findUnique({
      where: {id: artistId},
    });
    const fav = await this.prisma.favorite.findUnique({
      where: {id: 1},
      include: {artists: true}
    });

    if(artist === null)  
      throw new HttpException("Track has not been found", HttpStatus.UNPROCESSABLE_ENTITY);

    fav.artists.push(artist);

    await this.prisma.favorite.update({
      where: {id: 1},
      include: {artists: true},
      data: {
        artists: {set: fav.artists}
      }
    })
  }

  public async findAll(): Promise<Object>{
    return await this.prisma.favorite.findUnique({
      where: {id: 1},
      select: {
        tracks: true, artists: true, albums: true
      },
    });
  }

  public async removeTrack(trackId: string): Promise<void> {
    const fav = await this.prisma.favorite.findUnique({where: {id: 1}, include: {tracks: true}});
    const trackIndex = fav.tracks.findIndex(t => t.id === trackId);

    if(trackIndex === -1)
      throw new HttpException("The track is not favorite", HttpStatus.NOT_FOUND);
    
    fav.tracks.splice(trackIndex, 1);

    await this.prisma.favorite.update({
      where: {id: 1},
      include: {tracks: true},
      data: {
        tracks: {
          set: fav.tracks
        }
      }
    })
  }

  public async removeArtist(artistId: string): Promise<void> {
    const fav = await this.prisma.favorite.findUnique({where: {id: 1}, include: {artists: true}});
    const artistIndex = fav.artists.findIndex(a => a.id === artistId);

    if(artistIndex === -1)
      throw new HttpException("The track is not favorite", HttpStatus.NOT_FOUND);

    fav.artists.splice(artistIndex, 1);

    await this.prisma.favorite.update({
      where: {id: 1},
      include: {artists: true},
      data: {
        artists: {
          set: fav.artists
        }
      }
    });

  }

  public async removeAlbum(albumId: string) {
    const fav = await this.prisma.favorite.findUnique({where: {id: 1}, include: {albums: true}});
    const albumIndex = fav.albums.findIndex(a => a.id === albumId);

    if(albumIndex === -1)
      throw new HttpException("The track is not favorite", HttpStatus.NOT_FOUND);

    fav.albums.splice(albumIndex, 1);

    await this.prisma.favorite.update({
      where: {id: 1},
      include: {albums: true},
      data: {
        albums: {
          set: fav.albums
        }
      }
    });
  }
}
