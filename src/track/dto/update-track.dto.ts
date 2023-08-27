import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

interface UpdateTrackDtoInterface {
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export class UpdateTrackDto implements UpdateTrackDtoInterface {
  @ApiProperty({ example: 'Holly drivers' })
  @IsOptional()
  @IsString()
  public name: string;

  @ApiPropertyOptional({ format: 'uuid', nullable: true })
  @IsOptional()
  @IsUUID()
  public artistId: string | null;

  @ApiPropertyOptional({ format: 'uuid', nullable: true })
  @IsOptional()
  @IsUUID()
  public albumId: string | null;

  @ApiProperty({ example: '12345' })
  @IsOptional()
  @IsNumber()
  public duration: number;
}
