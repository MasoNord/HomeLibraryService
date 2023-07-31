import { ApiProperty } from '@nestjs/swagger';

interface ArtiestInterface {
    id: string;
    name: string;
    grammy: boolean
}

export class Artist implements ArtiestInterface {
    @ApiProperty({format: 'uuid'})
    public id: string;
    
    @ApiProperty({example: 'Artist1'})
    public name: string;

    @ApiProperty({example: false})
    public grammy: boolean;
    
    constructor(props: Artist) {
        Object.assign(this, props);
    }
}
