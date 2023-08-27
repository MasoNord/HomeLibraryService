import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

interface CreateAlbumDtoInterface {
  name: string;
  year: number;
  artistId: string | null;
}

export class CreateAlbumDto implements CreateAlbumDtoInterface {
  @ApiProperty({ example: 'testAlbum' })
  @IsString()
  public name: string;

  @ApiProperty({ example: 2013 })
  @IsNumber()
  public year: number;

  @ApiPropertyOptional({ format: 'uuid', nullable: true })
  @IsOptional()
  @IsUUID()
  public artistId: string | null;
}
