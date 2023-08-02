import {IsArray} from "class-validator";
import {ApiProperty} from '@nestjs/swagger';
import { Artist } from 'src/artist/entities/artist.entity';
import { Album } from 'src/album/entities/album.entity';
import { Track } from 'src/track/entity/track.entity';

interface CreateFavoriteDtoInterface {
    artists: Artist[];
    albums: Album[];
    tracks: Track[];
}

export class CreateFavoriteDto implements CreateFavoriteDtoInterface {
    @ApiProperty({isArray: true})
    @IsArray()
    public artists: Artist[];

    @ApiProperty({isArray: true})
    @IsArray()
    public albums: Album[];

    @ApiProperty({isArray: true})
    @IsArray()
    public tracks: Track[];
}
