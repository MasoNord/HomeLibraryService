import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


interface TrackEntity {
    id: string;
    name: string;
    artistId: string | null;
    albumId: string | null;
    duration: number;
}

export class Track implements TrackEntity {
    @ApiProperty({format: 'uuid'})
    public id: string;

    @ApiProperty({example: 'Track1'})
    public name: string;

    @ApiPropertyOptional({format: 'uuid', nullable: true})
    public artistId: string | null;

    @ApiPropertyOptional({format: 'uuid', nullable: true})
    public albumId: string | null;
    
    @ApiProperty({example: '203'})
    public duration: number;
    
    constructor(props: Track) {
        Object.assign(this, props);
    }
}
