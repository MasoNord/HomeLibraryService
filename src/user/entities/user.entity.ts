import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

interface UserInterface {
    id: string,
    version: number,
    login: string,
    password: string,
    createdAt: number,
    updatedAt: number
}

export class User implements UserInterface  {    
    
    @ApiProperty({format: 'uuid'})
    public id: string;
    
    @ApiProperty({example: 'User1'})
    public login: string;
    
    @Exclude()
    public password: string;

    @ApiPropertyOptional({example: 1})
    public version: number
    
    @ApiProperty({example: 1200000})
    public createdAt: number;
    
    @ApiProperty({example: 1200000})
    public updatedAt: number
    
    constructor(props: User) {
        Object.assign(this, props);
    }
}