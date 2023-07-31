import {IsBoolean, IsString } from "class-validator";
import {ApiPropertyOptional } from '@nestjs/swagger';

interface CreateArtistDtoInterface {
    name: string;
    grammy: boolean;
}

export class CreateArtistDto implements CreateArtistDtoInterface{
    @ApiPropertyOptional({example: 'Holly drivers'})
    @IsString()
    public name: string;

    @ApiPropertyOptional({example: false})
    @IsBoolean()
    public grammy: boolean
}
