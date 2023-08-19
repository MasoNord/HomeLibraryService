import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

interface AlbumInterface {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export class Album implements AlbumInterface {
  @ApiProperty({ format: 'uuid' })
  public id: string;

  @ApiProperty({ example: 'testAlbum' })
  public name: string;

  @ApiProperty({ example: 2013 })
  public year: number;

  @ApiPropertyOptional({ format: 'uuid', nullable: true })
  public artistId: string | null;

  constructor(props: Album) {
    Object.assign(this, props);
  }
}
