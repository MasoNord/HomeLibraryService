import {IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

interface CreateTrackDtoInterface {
    name: string;
    artistId: string | null;
    albumId: string | null;
    duration: number;
}


export class CreateTrackDto implements CreateTrackDtoInterface {
    @ApiProperty({example: 'Holly drivers'})
    @IsString()
    public name: string;

    @ApiPropertyOptional({format: 'uuid', nullable: true})
    @IsOptional()
    @IsUUID()
    public artistId: string | null

    @ApiPropertyOptional({format: 'uuid', nullable: true})
    @IsOptional()
    @IsUUID()
    public albumId: string | null

    @ApiProperty({example: '12345'})
    @IsNumber()
    public duration: number

}
