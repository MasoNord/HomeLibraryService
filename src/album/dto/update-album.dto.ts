import {IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

interface UpdateAlbumDtoInterface{
    name: string;
    year: number;
    artistId: string | null;
}

export class UpdateAlbumDto implements UpdateAlbumDtoInterface{
    @ApiProperty({example: 'testAlbum'})
    @IsOptional()
    @IsString()
    public name: string;
    
    @ApiProperty({example: 2013})
    @IsOptional()
    @IsNumber()
    public year: number;

    @ApiPropertyOptional({format: 'uuid', nullable: true})
    @IsOptional()
    @IsUUID()
    public artistId: string | null
}
